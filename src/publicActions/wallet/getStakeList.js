import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import { debugConsoleLog } from '../../helpers/debugConsoleLog'
import walletInstances from '../../walletInstances'

export const getStakeList = (walletId) => {
  // checks
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)

  debugConsoleLog('**getStakeList-public id', walletId)

  // call walletInstance method
  return walletInstances.getWalletInstanceById(walletId).getStakeList()
}
