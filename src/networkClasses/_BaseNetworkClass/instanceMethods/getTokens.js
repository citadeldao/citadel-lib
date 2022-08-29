import networkClasses from '../../../networkClasses'

export const getTokens = function () {
  // return array with token names
  return networkClasses.getNetworkClass(this.net).tokens
}
