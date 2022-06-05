import api from '../../api'
import networks from '../../networks'

export default async (options) => {
  const { data } = await api.requests.getDelegationBalance(options)
  // rename "rewards" field
  data.claimableRewards = data?.rewards
  delete data.rewards

  // calc balance
  data.calculatedBalance = networks
    .getNetworkClass(networks.getNativeNet(options.net))
    .calculateBalance(data)
  return { data }
}
