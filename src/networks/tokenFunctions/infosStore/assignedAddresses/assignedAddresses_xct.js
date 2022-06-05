import api from '../../../../api'

export default async function() {
  const { data } = await api.requests.getDaoAssignedAddresses({
    address: this.address,
  })
  return data
}
