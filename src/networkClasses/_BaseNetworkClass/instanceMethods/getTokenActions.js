import { getTokenFunctions } from '../../_tokenFunctions'

export const getTokenActions = function (token) {
  const standard = this.subtokensList.find(item => item.net === token)?.standard
  // return array with action names
  return Object.keys(getTokenFunctions(this.net, token, 'actions', standard))
}
