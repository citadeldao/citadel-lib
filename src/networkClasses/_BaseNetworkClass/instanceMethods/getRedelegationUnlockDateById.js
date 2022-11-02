import api from '../../../api'

// proxy request to backend
export const getRedelegationUnlockDateById = async function () {
  const data = await api.requests.getRedelegationUnlockDate({
    net: this.net,
    address: this.address,
  })
  return data.data
}