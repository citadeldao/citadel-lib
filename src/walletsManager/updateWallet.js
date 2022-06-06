import { merge } from '../helpers/merge'
import { getWalletInfoById } from './getWalletInfoById'
import walletInstances from '../walletInstances'
import storage from '../storage'

// used to update the cache (and instance state) of the wallet
export const updateWallet = ({
  walletId,
  newWalletInfo,
  method = 'shallow-merge',
}) => {
  let wallet = getWalletInfoById(walletId)

  // return if wallet was removed to prevent errors
  if (!wallet) {
    console.warn(
      `Wallet does not exist. Wallet keys "${Object.keys(
        newWalletInfo
      )}" have not been updated`
    )
    return
  }

  if (method === 'shallow-merge') {
    // by default
    wallet = { ...wallet, ...newWalletInfo }
  } else if (method === 'deep-merge') {
    // for deep merge (but replace arrays)
    merge(wallet, newWalletInfo)
  } else if (method === 'replace') {
    // clean old wallet
    wallet = {
      // set required fields
      id: walletId,
      net: wallet.net,
      address: wallet.address,
      ...newWalletInfo,
    }
  }
  // save wallet to storage
  storage.wallets.putWallet(wallet)

  // update wallet instance if it exist
  if (walletInstances.getWalletInstanceById(wallet.id)) {
    walletInstances.updateWalletInstance(wallet)
  }

  // return updated wallet
  return wallet
}
