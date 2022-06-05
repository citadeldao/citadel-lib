import networks from '../../..'
import errors from '../../../../errors'
import tokenFunctions from '../../../tokenFunctions'

export default async function (token, infoName, options = {}) {
  const networkClass = networks.getNetworkClass(this.net)
  if (!networkClass.tokens) {
    errors.throwError('MethodNotSupported', {
      method: 'callTokenInfo',
      net: this.net,
    })
  }

  if (!this.getTokenInfos(token).includes(infoName)) {
    errors.throwError('MethodNotSupported', {
      message: `"${token}" token is not support "${infoName}" info`,
    })
  }

  const infoGetter = tokenFunctions.getTokenFunctions(this.net, token, 'infos')[
    infoName
  ]

  if (!infoGetter) {
    errors.throwError('MethodNotImplemented', {
      method: infoName,
    })
  }

  return infoGetter.call(this, { token, ...options })
}
