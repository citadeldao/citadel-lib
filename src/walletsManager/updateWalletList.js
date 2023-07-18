import { addCreatedWallet } from './addCreatedWallet'
import { getWalletList } from './getWalletList'
import { updateWallet } from './updateWallet'
import state from '../state'
import storage from '../storage'
import networkClasses from '../networkClasses'
import { CACHE_NAMES } from '../constants'
import walletInstances from '../walletInstances'
//import { additionalConfig } from './../api/formattedRequestsAdapter/_hardCode'

// update wallet list by account wallets (used inside the library with 'info', 'wallets', 'walletsDetail' requests)
export const updateWalletList = async (
  accountWallets,
  updateSubtokensList = true
) => {
  const supportedAccountWallets = accountWallets
    // filter unsupported network
    .filter((wallet) =>
      state.getState(CACHE_NAMES.SUPPORTED_NETWORK_KEYS).includes(wallet.net)
    )
    // leave only important fields
    .map(
      ({ id, net, address, balance, claimedRewards, notification, title, tokens }) => ({
        id,
        net,
        address,
        balance,
        claimedRewards,
        notification,
        title,
        subtokensList: tokens.map(item => {
          //const addConfig = additionalConfig.find(item => item.net === net)?.config?.tokens?.[item.token] || {}
          const formatedItem = {
            ...item,
            net: item.token,
            ...item.meta,
            decimals: item.meta.decimal,
            nativeNet: net,
            // ...addConfig,
            tokenBalance: {
              mainBalance: item.details.available,
              calculatedBalance: item.balance,
              price: item.price,
              adding: [],
              delegatedBalance: 0,
              frozenBalance: item.details.frozen,
              originatedAddresses: [],
              stake: item.details.stake,
              unstake: 0,
              linked: true,
              claimableRewards: 0,
              hasTransactionComment: true
            },
          }
          delete formatedItem.details
          delete formatedItem.meta
          delete formatedItem.decimal
          return formatedItem
        })
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
          subtokensList: accountWallet.subtokensList,
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
          addToAccount: false,
          loadBalance: false,
          updateSubtokensList,
        })
      }
    })
  )

  //create supported tokens object
  const walletsList = getWalletList()
  const supportedTokens = {}

  walletsList.forEach(({subtokensList, net}) => {
    subtokensList.forEach(item => {
      supportedTokens[item.net] = net
    })
  })
  // set supported tokens to state
  state.setState('supportedTokens', supportedTokens)

  // sync wallet instances
  await walletInstances.syncWalletInstancesWithStorage()
}
