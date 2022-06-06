import { getTokenFunctions } from '../../_tokenFunctions'

export const getTokenActions = function (token) {
  // return array with action names
  return Object.keys(getTokenFunctions(this.net, token, 'actions'))
}
