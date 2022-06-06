import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export const prepareClaimUnstaked = async (walletId) => {
  // checks
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)

  // call wallet instance method
  return await walletInstances
    .getWalletInstanceById(walletId)
    .prepareClaimUnstaked()
}
