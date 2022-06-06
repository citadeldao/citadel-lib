import errors from '../../../errors'
import { getTokenFunctions } from '../../_tokenFunctions'

export const callTokenInfo = async function (token, infoName, options = {}) {
  const infoFunction = getTokenFunctions(this.net, token, 'infos')[infoName]

  // if token config from server has infoName, but infosStore has no function for it, throw error
  !infoFunction &&
    errors.throwError('MethodNotImplemented', {
      method: infoName,
    })

  // call info function in context of this wallet
  return infoFunction.call(this, { token, ...options })
}
