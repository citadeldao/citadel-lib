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
    ['token', token, ['String'], true]
  )
  checkNetworkOrToken(token)
  checkWalletId(walletId)

  const actionsArray = walletInstances
    .getWalletInstanceById(walletId)
    .getTokenActions(token)

  return actionsArray.reduce((target, key) => {
    target[key] = true
    return target
  }, {})
}
