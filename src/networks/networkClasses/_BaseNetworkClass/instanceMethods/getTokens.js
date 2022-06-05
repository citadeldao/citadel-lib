import errors from '../../../../errors'
import networks from '../../..'

export default function () {
  const networkClass = networks.getNetworkClass(this.net)

  if (!networkClass.tokens || !Object.keys(networkClass.tokens).length) {
    errors.throwError('MethodNotSupported', {
      method: 'getTokens',
      net: this.net,
    })
  }
  return Object.keys(networkClass.tokens)
}
