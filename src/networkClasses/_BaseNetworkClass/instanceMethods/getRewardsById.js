import api from '../../../api'

// proxy request to backend
export const getRewardsById = async function () {
  const data = await api.requests.getWalletRewards({
    net: this.net,
    address: this.address,
  })
  return data.data
}
