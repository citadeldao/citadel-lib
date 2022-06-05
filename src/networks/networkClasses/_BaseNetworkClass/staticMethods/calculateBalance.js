import BigNumber from 'bignumber.js'

export default function({
  mainBalance = 0,
  stake = 0,
  frozenBalance = 0,
} = {}) {
  return BigNumber(mainBalance)
    .plus(stake)
    .plus(frozenBalance)
    .toNumber()
}
