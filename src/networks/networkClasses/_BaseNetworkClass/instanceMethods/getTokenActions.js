import errors from '../../../../errors'
import tokenFunctions from '../../../tokenFunctions'
import networks from '../../..'

export default function (token) {
  const networkClass = networks.getNetworkClass(this.net)
  // needs for public wallets for check stake and calculate subtokens
  if (!networkClass.tokens || !Object.keys(networkClass.tokens).length) {
    errors.throwError('MethodNotSupported', {
      method: 'getTokenActions',
      net: this.net,
    })
  }

  const tokenActions = tokenFunctions.getTokenFunctions(
    this.net,
    token,
    'actions'
  )

  return Object.keys(tokenActions)
}
