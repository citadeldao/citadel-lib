import api from '../../../../api'

export async function total_claimed_rewards_xct() {
  const { data } = await api.requests.getTotalClaimedRewardsXct({
    address: this.address,
  })
  return data
}
