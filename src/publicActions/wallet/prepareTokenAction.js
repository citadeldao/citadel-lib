import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  checkNetworkOrToken,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export default (walletId, token, action, options) => {
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String'], true],
    ['action', action, ['String'], true],
    ['options', options, ['Object']]
  )
  checkNetworkOrToken(token)
  checkWalletId(walletId)

  return walletInstances
    .getWalletInstanceById(walletId)
    .prepareTokenAction(token, action, options)
}
