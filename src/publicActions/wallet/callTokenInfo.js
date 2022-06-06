import {
  checkTypes,
  checkInitialization,
  checkNetworkOrToken,
  checkWalletId,
  checkTokensSupport,
  checkNetworkToken,
} from '../../helpers/checkArguments'
import errors from '../../errors'
import walletInstances from '../../walletInstances'

export const callTokenInfo = (walletId, token, infoName, options) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String'], true],
    ['infoName', infoName, ['String'], true],
    ['options', options, ['Object']]
  )
  checkNetworkOrToken(token)
  checkWalletId(walletId)

  const walletInstance = walletInstances.getWalletInstanceById(walletId)
  checkTokensSupport(walletInstance.net)
  checkNetworkToken(walletInstance.net, token)

  if (!walletInstance.getTokenInfos(token).includes(infoName)) {
    errors.throwError('MethodNotSupported', {
      message: `"${token}" token is not support "${infoName}" info`,
    })
  }

  // call walletInstance method (some functions contain walletListUpdated event inside)
  return walletInstance.callTokenInfo(token, infoName, options)
}
