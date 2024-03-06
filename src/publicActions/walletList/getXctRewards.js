import api from '../../api'

export const getXctRewards = async (address) => {
  // proxies a request to a backend
  const { data } = await api.requests.getXctRewards({
    address,
  })
  return data
}