import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export default async (walletId, dateFrom, dateTo) => {
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['dateFrom', dateFrom, ['String', 'Number'], true],
    ['dateTo', dateTo, ['String', 'Number'], true]
  )
  checkWalletId(walletId)

  return await walletInstances
    .getWalletInstanceById(walletId)
    .getDaoRewardsByRange(dateFrom, dateTo)
}
