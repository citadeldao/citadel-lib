import addCreatedWallet from './addCreatedWallet'
import state from '../state'
import storage from '../storage'
import networks from '../networks'

// update wallet list by account wallets
export default async function (accountWallets) {
  const supportedAccountWallets = accountWallets
    // filter unsupported network
    .filter((wallet) =>
      state.getState('supportedNetworkKeys').includes(wallet.net)
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

  // get network config for update
  const networksConfig = storage.caches.getCache('networksConfig')
  // get storage wallets
  const storageWalletList = storage.wallets.getWalletList()

  // delete or update existing wallets
  storageWalletList.map((storageWallet) => {
    const accountWallet = supportedAccountWallets.find(
      ({ id }) => id === storageWallet.id
    )
    if (!accountWallet) {
      // remove missing wallets from storage
      storage.wallets.removeWallet(storageWallet)
      return
    } else {
      // update existing wallets in storage
      const networkConfig = networksConfig[accountWallet.net]
      storage.wallets.updateWallet({
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
      storage.wallets.updateWallet({
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
      if (!storageWalletList.find(({ id }) => id === accountWallet.id)) {
        // create public wallet
        const createdWallet = networks
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
        })
      }
    })
  )
}
