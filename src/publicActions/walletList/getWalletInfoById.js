import walletsManager from '../../walletsManager'
import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'

export const getWalletInfoById = async (walletId) => {
  // checks
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)

  // call api
  return walletsManager.getWalletInfoById(walletId)
}
