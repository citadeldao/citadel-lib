import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export default (walletId, hash) => {
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)

  return walletInstances
    .getWalletInstanceById(walletId)
    .getTransactionURLByHash(hash)
}
