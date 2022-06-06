import api from '../../api'
import networkClasses from '../../networkClasses'

// modify the backend response (will move to the backend in the future)
export const getInfo = async () => {
  // get original response
  const { data } = await api.requests.getInfo()
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
