import api from '../../../../api'

export default async function() {
  const { data } = await api.requests.getTotalClaimedRewardsXct({
    address: this.address,
  })
  return data
}
