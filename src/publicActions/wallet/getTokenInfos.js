import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  checkNetworkOrToken,
  checkTokensSupport,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export const getTokenInfos = (walletId, token) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String'], true]
  )
  checkNetworkOrToken(token)
  checkWalletId(walletId)
  const walletInstance = walletInstances.getWalletInstanceById(walletId)
  checkTokensSupport(walletInstance.net)

  // call walletInstance method
  const infosArray = walletInstance.getTokenInfos(token)

  // return object from infosArray: { infoName: true }
  return infosArray.reduce((target, key) => {
    target[key] = true
    return target
  }, {})
}
