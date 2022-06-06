import api from '../../api'
import networkClasses from '../../networkClasses'

// modify the backend response (will move to the backend in the future)
export const getWallets = async () => {
  // get original response
  const { data } = await api.requests.getWallets()
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
