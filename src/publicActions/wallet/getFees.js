import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  checkNetworkOrToken,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export default (walletId, token) => {
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String']]
  )
  token && checkNetworkOrToken(token)
  checkWalletId(walletId)
  return walletInstances.getWalletInstanceById(walletId).getFees(token)
}
