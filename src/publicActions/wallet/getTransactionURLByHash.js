import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export const getTransactionURLByHash = (walletId, hash) => {
  // checks
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)

  // call wallet instance method
  return walletInstances
    .getWalletInstanceById(walletId)
    .getTransactionURLByHash(hash)
}
