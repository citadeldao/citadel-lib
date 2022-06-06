// Relevant until the Kepler signature is integrated into the library. After using the 'Assign To Dao' method
import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  checkNetworkDaoSupport,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export const prepareAssignToDaoMessage = async (walletId) => {
  // checks
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)
  const walletInstance = walletInstances.getWalletInstanceById(walletId)
  checkNetworkDaoSupport(walletInstance.net)

  // call walletInstance method
  return await walletInstance.prepareAssignToDaoMessage()
}
