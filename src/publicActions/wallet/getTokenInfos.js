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

  const infosArray = walletInstances
    .getWalletInstanceById(walletId)
    .getTokenInfos(token)

  return infosArray.reduce((target, key) => {
    target[key] = true
    return target
  }, {})
}
