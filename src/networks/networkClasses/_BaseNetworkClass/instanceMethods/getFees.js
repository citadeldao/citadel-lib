import api from '../../../../api'

export default async function (token) {
  const { data } = await api.requests.getFees({
    net: token || this.net,
  })
  return data
}
