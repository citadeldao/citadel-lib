import errors from '../../../errors'
import { getTokenFunctions } from '../../_tokenFunctions'

export const prepareTokenAction = async function (
  token,
  actionName,
  options = {}
) {
  const tokenActions = getTokenFunctions(this.net, token, 'actions')

  const actionFunction = tokenActions[actionName]

  !actionFunction &&
    errors.throwError('MethodNotImplemented', {
      method: actionName,
    })

  return actionFunction.call(this, { token, ...options })
}
