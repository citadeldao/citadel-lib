import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export const getKTAddresses = (walletId) => {
  // checks
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)

  // call walletInstance method
  return walletInstances.getWalletInstanceById(walletId).getKTAddresses()
}
