import api from '../../../../api'

export async function rewards_xct() {
  // proxies a request to a backend
  const { data } = await api.requests.getXctRewards({
    address: this.address,
  })
  return data
}