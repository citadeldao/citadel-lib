import { getTokenFunctions } from '../../_tokenFunctions'

export const getTokenInfos = function (token) {
  const standard = this.subtokensList.find(item => item.net === token)?.standard
  // return array with infos names
  return Object.keys(getTokenFunctions(this.net, token, 'infos', standard))
}
