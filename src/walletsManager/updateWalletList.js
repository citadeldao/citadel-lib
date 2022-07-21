import { addCreatedWallet } from './addCreatedWallet'
import { getWalletList } from './getWalletList'
import { updateWallet } from './updateWallet'
import state from '../state'
import storage from '../storage'
import networkClasses from '../networkClasses'
import { CACHE_NAMES } from '../constants'
import walletInstances from '../walletInstances'

// update wallet list by account wallets (used inside the library with 'info', 'wallets', 'walletsDetail' requests)
export const updateWalletList = async (accountWallets, updateSubtokensList = true) => {
  const supportedAccountWallets = accountWallets
    // filter unsupported network
    .filter((wallet) =>
      state.getState(CACHE_NAMES.SUPPORTED_NETWORK_KEYS).includes(wallet.net)
    )
    // leave only important fields
    .map(
      ({ id, net, address, balance, claimedRewards, notification, title }) => ({
        id,
        net,
        address,
        balance,
        claimedRewards,
        notification,
        title,
      })
    )

  // get network config for update network info in wallets
  const networksConfig = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)
  // get storage wallets
  const walletList = getWalletList()

  // delete or update existing wallets
  walletList.map((storageWallet) => {
    const accountWallet = supportedAccountWallets.find(
      ({ id }) => id === storageWallet.id
    )
    if (!accountWallet) {
      // remove missing wallets from storage
      storage.wallets.removeWallet(storageWallet.id)
      return
    } else {
      // update existing wallets in storage
      const networkConfig = networksConfig[accountWallet.net]
      updateWallet({
        walletId: storageWallet.id,
        newWalletInfo: {
          claimedRewards: accountWallet.claimedRewards,
          countTransactions: accountWallet.claimedRewards,
          title: accountWallet.title,
          // update network info
          code: networkConfig.code,
          methods: networkConfig.methods,
          networkName: networkConfig.name,
          ...(networkConfig.fee_key && { fee_key: networkConfig.fee_key }),
          ...(networkConfig.bridges && { bridges: networkConfig.bridges }),
        },
      })

      // update the balances separately without touching the unchanged keys (method: 'deep-merge')
      updateWallet({
        walletId: storageWallet.id,
        newWalletInfo: {
          balance: accountWallet.balance,
        },
        method: 'deep-merge',
      })
    }
  })

  // add new wallets
  await Promise.all(
    supportedAccountWallets.map(async (accountWallet) => {
      // new wallet?
      if (!walletList.find(({ id }) => id === accountWallet.id)) {
        // create public wallet
        const createdWallet = networkClasses
          .getNetworkClass(accountWallet.net)
          .createPublicWallet({
            net: accountWallet.net,
            address: accountWallet.address,
          })
        // add public wallet
        await addCreatedWallet({
          createdWallet: {
            ...createdWallet,
            // add balance, title and id from account wallet
            ...accountWallet,
          },
          checkExistence: false,
          addToAccount: false,
          loadBalance: false,
          updateSubtokensList
        })
      }
    })
  )

  // get storage wallets
  const updatedWalletList = getWalletList()

  // update / create wallet instances
  await Promise.all(
    updatedWalletList.map(async (walletInfo) => {
      if (walletInstances.getWalletInstanceById(walletInfo.id)) {
        // update wallet instances
        walletInstances.updateWalletInstance(walletInfo)
      } else {
        // create wallet instances
        walletInstances.createWalletInstance(walletInfo)
      }
    })
  )
}
