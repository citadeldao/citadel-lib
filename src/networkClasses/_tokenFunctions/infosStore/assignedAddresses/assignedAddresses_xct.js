import api from '../../../../api'

export async function assignedAddresses_xct() {
  // proxies a request to a backend
  const { data } = await api.requests.getDaoAssignedAddresses({
    address: this.address,
  })
  return data
}
