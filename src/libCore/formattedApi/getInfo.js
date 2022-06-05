import api from '../../api'
import networks from '../../networks'

export default async () => {
  const { data } = await api.requests.getInfo()
  data.wallets = data.wallets.map(
    ({
      net,
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
        calculatedBalance: networks
          .getNetworkClass(net)
          ?.calculateBalance(balance),
      },
    })
  )
  return { data }
}
