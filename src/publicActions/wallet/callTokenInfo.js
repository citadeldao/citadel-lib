import {
  checkTypes,
  checkInitialization,
  checkNetworkOrToken,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export default (walletId, token, infoName, options) => {
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String'], true],
    ['infoName', infoName, ['String'], true],
    ['options', options, ['Object']]
  )
  checkNetworkOrToken(token)
  checkWalletId(walletId)

  return walletInstances
    .getWalletInstanceById(walletId)
    .callTokenInfo(token, infoName, options)
}
