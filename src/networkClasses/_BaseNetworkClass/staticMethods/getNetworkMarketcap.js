import api from '../../../api'

// proxy request to backend
export const getNetworkMarketcap = async function () {
  const data = await api.requests.getMarketcap({ net: this.net })
  return data.data
}
