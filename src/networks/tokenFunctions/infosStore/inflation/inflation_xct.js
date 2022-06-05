import api from '../../../../api'

export default async function() {
  const { data } = await api.requests.getXctInflation({
    address: this.address,
  })
  return data
}
