import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  checkNetworkOrToken,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export const getCrossNetworkRoutes = (walletId, token) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String'], true]
  )
  checkWalletId(walletId)
  checkNetworkOrToken(token)

  // call walletInstance method
  return walletInstances
    .getWalletInstanceById(walletId)
    .getCrossNetworkRoutes(token)
}
