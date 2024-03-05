import api from '../../api'

export const getTotalClaimedRewardsXCT = () => {
  const { data } = await api.requests.getTotalClaimedRewardsXct({
    address,
  })
  return data
}
