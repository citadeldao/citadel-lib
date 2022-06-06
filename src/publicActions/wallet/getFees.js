import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  checkNetworkOrToken,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export const getFees = (walletId, token) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String']]
  )
  token && checkNetworkOrToken(token)
  checkWalletId(walletId)

  // call walletInstance method
  return walletInstances.getWalletInstanceById(walletId).getFees(token)
}
