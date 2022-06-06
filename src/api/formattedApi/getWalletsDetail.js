import api from '../../api'
import networkClasses from '../../networkClasses'

// will be moved to the backend
export const getWalletsDetail = async () => {
  // get original response
  const { data } = await api.requests.getWalletsDetail()
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
