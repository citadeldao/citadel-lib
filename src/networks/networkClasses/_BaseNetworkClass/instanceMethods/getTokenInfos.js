import errors from '../../../../errors'
import tokenFunctions from '../../../tokenFunctions'
import networks from '../../..'

export default function (token) {
  const networkClass = networks.getNetworkClass(this.net)

  if (!networkClass.tokens || !Object.keys(networkClass.tokens).length) {
    errors.throwError('MethodNotSupported', {
      method: 'getTokenInfos',
      net: this.net,
    })
  }

  const tokenInfos = tokenFunctions.getTokenFunctions(this.net, token, 'infos')

  return Object.keys(tokenInfos)
}
