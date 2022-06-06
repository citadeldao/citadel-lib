import api from '../api'
import storage from '../storage'
import walletInstances from '../walletInstances'

export const removeWallet = async (walletId) => {
  // remove wallet from account
  try {
    await api.requests.removeWallet(walletId)
    // catch error if wallet not exist in account
  } catch (error) {
    console.error(error)
    if (error.status >= 500) {
      throw error
    }
  }
  // remove wallet from storage
  storage.wallets.removeWallet(walletId)

  // remove walletInstance
  walletInstances.removeWalletInstanceById(walletId)
}
