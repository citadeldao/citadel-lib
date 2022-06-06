import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export const getDaoRewardsByRange = async (walletId, dateFrom, dateTo) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['dateFrom', dateFrom, ['String', 'Number'], true],
    ['dateTo', dateTo, ['String', 'Number'], true]
  )
  checkWalletId(walletId)

  // call walletInstance method
  return await walletInstances
    .getWalletInstanceById(walletId)
    .getDaoRewardsByRange(dateFrom, dateTo)
}
