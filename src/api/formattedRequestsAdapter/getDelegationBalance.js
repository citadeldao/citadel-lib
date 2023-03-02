import networkClasses from '../../networkClasses'
import BigNumber from 'bignumber.js'
// import { requests } from '../requests'
import { publicRequests } from '../requests'
import { createApiRequests } from '../createApiRequests'
import state from '../../state'

// modify the backend response (will move to the backend in the future)
export const getDelegationBalance = async (options) => {
  const backendUrl = state.getState('backendUrl')
  // create original axios function
  const originalRequest = createApiRequests({
    baseURL: backendUrl,
    withCredentials: true,
    // singleRequest: requests.getDelegationBalance,
    singleRequest: publicRequests.getDelegationBalance,
    enableResponseHandler: true,
  })

  // get original response
  const { data } = await originalRequest(options)

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
