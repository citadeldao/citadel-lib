import storage from '../../storage'
import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'

export default async (walletId) => {
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)
  return storage.wallets.getWalletById()
}
