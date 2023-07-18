import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  // checkNetworkOrToken,
  // checkNetworkToken,
  checkTokensSupport,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export const getTokenActions = (walletId, token) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String'], true]
  )
  // checkNetworkOrToken(token)
  checkWalletId(walletId)
  const walletInstance = walletInstances.getWalletInstanceById(walletId)
  checkTokensSupport(walletInstance.net)
  // checkNetworkToken(walletInstance.net, token)

  // call walletInstance method
  const actionsArray = walletInstance.getTokenActions(token)

  // return object from actionsArray: { actionName: true }
  return actionsArray.reduce((target, key) => {
    target[key] = true
    return target
  }, {})
}
