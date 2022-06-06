import BigNumber from 'bignumber.js'

export const calculateBalance = function ({
  mainBalance = 0,
  stake = 0,
  frozenBalance = 0,
} = {}) {
  // by default - sum of mainBalance, stake and frozenBalance
  return BigNumber(mainBalance).plus(stake).plus(frozenBalance).toNumber()
}
