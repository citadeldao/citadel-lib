import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  // checkNetworkOrToken,
  // checkNetworkToken,
  checkTokensSupport,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export const prepareTokenAction = (walletId, token, action, options) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String'], true],
    ['action', action, ['String'], true],
    ['options', options, ['Object']]
  )
  // checkNetworkOrToken(token)
  checkWalletId(walletId)
  const walletInstance = walletInstances.getWalletInstanceById(walletId)
  checkTokensSupport(walletInstance.net)
  // checkNetworkToken(walletInstance.net, token)

  // call walletInstance method
  return walletInstance.prepareTokenAction(token, action, options)
}
