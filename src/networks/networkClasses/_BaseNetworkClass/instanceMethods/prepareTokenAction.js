import errors from '../../../../errors'
import tokenFunctions from '../../../tokenFunctions'
import networks from '../../..'

export default async function (token, actionName, options = {}) {
  const networkClass = networks.getNetworkClass(this.net)

  // check arguments
  if (!networkClass.tokens || !Object.keys(networkClass.tokens).length) {
    errors.throwError('MethodNotSupported', {
      method: 'prepareTokenAction',
      net: this.net,
    })
  }
  if (!this.getTokenActions(token).includes(actionName)) {
    errors.throwError('MethodNotSupported', {
      message: `"${token}" token is not support ${actionName}" action`,
    })
  }

  const tokenActions = tokenFunctions.getTokenFunctions(
    this.net,
    token,
    'actions'
  )

  const action = tokenActions[actionName]

  if (!action) {
    errors.throwError('MethodNotImplemented', {
      method: actionName,
    })
  }

  return action.call(this, { token, ...options })
}
