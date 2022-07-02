import networkClasses from '../../networkClasses'
import BigNumber from 'bignumber.js'
import { publicRequests } from './publicRequests'
import { createApiRequests } from '../createApiRequests'
import state from '../../state'
// modify the backend response (will move to the backend in the future)
export const getDelegationBalance = async (options) => {
  const publicBackendUrl = state.getState('publicBackendUrl')

  // create axios function
  const publicRequest = createApiRequests({
    // remove '/api' substring
    baseURL: publicBackendUrl,
    withCredentials: true,
    singleRequest: publicRequests.getDelegationBalance,
    enableResponseHandler: true,
  })

  // get original response
  const { data } = await publicRequest(options)

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
