import errors from '../../../errors'
import { getTokenFunctions } from '../../_tokenFunctions'

export const callTokenInfo = async function (token, infoName, options = {}) {
  const standard = this.subtokensList.find(item => item.net === token)?.standard
  const infoFunction = getTokenFunctions(this.net, token, 'infos', standard)[infoName]

  // if token config from server has infoName, but infosStore has no function for it, throw error
  !infoFunction &&
    errors.throwError('MethodNotImplemented', {
      method: infoName,
    })

  // call info function in context of this wallet
  return infoFunction.call(this, { token, ...options })
}
