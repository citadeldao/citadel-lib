import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import api from '../../api'
import storage from '../../storage'

export default async (walletId) => {
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)
  try {
    await api.requests.removeWallet(walletId)
  } catch (error) {
    console.error(error)
  }
  storage.wallets.removeWallet(walletId)
}
