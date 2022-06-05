import api from '../../api'
import networks from '../../networks'

export default async () => {
  const { data } = await api.requests.getWalletsDetail()
  // rename some fields
  return {
    data: data.map(
      ({
        net,
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
          calculatedBalance: networks
            .getNetworkClass(net)
            ?.calculateBalance(balance),
        },
      })
    ),
  }
}
