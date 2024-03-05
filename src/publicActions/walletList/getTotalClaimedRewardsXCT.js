import api from '../../api'

export const getTotalClaimedRewardsXCT = async () => {
  const { data } = await api.requests.getTotalClaimedRewardsXct({
    address,
  })
  return data
}
