import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export const getAllDaoRewards = async (walletId) => {
  // checks
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)

  // call walletInstance method
  return await walletInstances
    .getWalletInstanceById(walletId)
    .getAllDaoRewards()
}
