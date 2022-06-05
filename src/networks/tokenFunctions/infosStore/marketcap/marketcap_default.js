import api from '../../../../api'

export default async function({ token }) {
  const { data } = await api.requests.getMarketcap({
    net: token,
  })
  return data
}
