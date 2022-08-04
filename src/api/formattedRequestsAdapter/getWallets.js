import networkClasses from '../../networkClasses'
import { requests } from '../requests'
import { createApiRequests } from '../createApiRequests'
import state from '../../state'

// modify the backend response (will move to the backend in the future)
export const getWallets = async () => {
  const backendUrl = state.getState('backendUrl')
  const accessToken = state.getState('accessToken')
  // create original axios function
  const originalRequest = createApiRequests({
    baseURL: backendUrl,
    withCredentials: true,
    singleRequest: requests.getWallets,
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
        // calc balance
        balance: {
          ...balance,
          claimableRewards,
          calculatedBalance: networkClasses
            .getNetworkClass(net)
            ?.calculateBalance(balance),
        },
      })
    ),
  }
}
