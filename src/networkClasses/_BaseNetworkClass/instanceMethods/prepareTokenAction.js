import errors from '../../../errors'
import { getTokenFunctions } from '../../_tokenFunctions'

export const prepareTokenAction = async function (
  token,
  actionName,
  options = {}
) {
  const standard = this.subtokensList.find(item => item.net === token)?.standard
  const tokenActions = getTokenFunctions(this.net, token, 'actions', standard)
  

  const actionFunction = tokenActions[actionName]

  !actionFunction &&
    errors.throwError('MethodNotImplemented', {
      method: actionName,
    })

  return actionFunction.call(this, { token, ...options })
}
