import api from '../../../../api'

export async function marketcap_default({ token }) {
  // proxies a request to a backend
  const { data } = await api.requests.getMarketcap({
    net: token,
  })
  return data
}
