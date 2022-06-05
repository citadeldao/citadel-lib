import api from '../../../../api'

export default async function() {
  const data = await api.requests.getStakeNodes()
  return data.data[this.net]
}
