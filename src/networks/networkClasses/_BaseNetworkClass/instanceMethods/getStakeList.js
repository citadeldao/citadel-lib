import api from '../../../../api'

export default async function() {
  const data = await api.requests.getStakeList({
    net: this.net,
    address: this.address,
  })
  return data.data
}
