import networkClasses from '../../../networkClasses'

export const getTokens = function () {
  // return array with token names
  return Object.keys(networkClasses.getNetworkClass(this.net).tokens)
}
