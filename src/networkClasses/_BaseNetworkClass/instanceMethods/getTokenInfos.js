import { getTokenFunctions } from '../../_tokenFunctions'

export const getTokenInfos = function (token) {
  // return array with infos names
  return Object.keys(getTokenFunctions(this.net, token, 'infos'))
}
