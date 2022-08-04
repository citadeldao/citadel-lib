import networkClasses from '../../networkClasses'
import { requests } from '../requests'
import { createApiRequests } from '../createApiRequests'
import state from '../../state'
import { getAuthToken } from '../getAuthToken'

// will be moved to the backend
export const getWalletsDetail = async () => {
  const backendUrl = state.getState('backendUrl')
  // get access token
  const accessToken = await getAuthToken()
  // create original axios function
  const originalRequest = createApiRequests({
    baseURL: backendUrl,
    withCredentials: true,
    singleRequest: requests.getWalletsDetail,
    enableResponseHandler: true,
    accessToken,
  })

  // get original response
  const { data } = await originalRequest()
  return {
    data: data.map(
      ({
        net,
        // rename "reward" and "rewards" field
        reward: claimedRewards,
        balance: { rewards: claimableRewards, ...balance },
        ...wallet
      }) => ({
        net,
        ...wallet,
        claimedRewards,
        balance: {
          ...balance,
          claimableRewards,
          // calc balance
          calculatedBalance: networkClasses
            .getNetworkClass(net)
            ?.calculateBalance(balance),
        },
      })
    ),
  }
}
