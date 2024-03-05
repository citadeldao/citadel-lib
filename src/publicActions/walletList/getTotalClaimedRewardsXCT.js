import api from '../../api'

export const getTotalClaimedRewardsXCT = async (address) => {
  const { data } = await api.requests.getTotalClaimedRewardsXct({
    address,
  })
  return data
}
