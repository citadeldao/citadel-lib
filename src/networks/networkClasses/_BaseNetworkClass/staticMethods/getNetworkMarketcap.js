import api from '../../../../api'

export default async function() {
  const data = await api.requests.getMarketcap({ net: this.net })
  return data.data
}
