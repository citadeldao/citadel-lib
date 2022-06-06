import api from '../../api'
import networkClasses from '../../networkClasses'
import BigNumber from 'bignumber.js'
// modify the backend response (will move to the backend in the future)
export const getDelegationBalance = async (options) => {
  // get original response
  const { data } = await api.requests.getDelegationBalance(options)
  // rename "rewards" field
  data.claimableRewards = data?.rewards
  delete data.rewards

  // calc balance
  if (options.net === 'bsc_xct') {
    const { mainBalance = 0, stake = 0, frozenBalance = 0 } = data
    data.calculatedBalance = BigNumber(mainBalance)
      .plus(stake)
      .plus(frozenBalance)
      .toNumber()
  } else {
    data.calculatedBalance = networkClasses
      .getNetworkClass(networkClasses.getNativeNet(options.net))
      .calculateBalance(data)
  }

  return { data }
}
