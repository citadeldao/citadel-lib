// Relevant until the Kepler signature is integrated into the library. After using the 'Assign To Dao' method
import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export default async (walletId) => {
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)

  return await walletInstances
    .getWalletInstanceById(walletId)
    .prepareAssignToDaoMessage()
}
