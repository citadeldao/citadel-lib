import api from '../../../../api'

export async function inflation_xct() {
  // proxies a request to a backend
  const { data } = await api.requests.getXctInflation({
    address: this.address,
  })
  return data
}
