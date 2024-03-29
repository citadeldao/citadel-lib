import networkClasses from '../../networkClasses'
import { requests } from '../requests'
import { createApiRequests } from '../createApiRequests'
import state from '../../state'

// modify the backend response (will move to the backend in the future)
export const getInfo = async () => {
  const backendUrl = state.getState('backendUrl')
  // create original axios function
  const originalRequest = createApiRequests({
    baseURL: backendUrl,
    withCredentials: true,
    singleRequest: requests.getInfo,
    enableResponseHandler: true,
  })

  // get original response
  const { data } = await originalRequest()

  data.wallets = data.wallets.map(
    ({
      net,
      // rename "reward" and "rewards" field
      balance: { rewards: claimableRewards, ...balance },
      reward: claimedRewards,
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
  )
  return { data }
}
