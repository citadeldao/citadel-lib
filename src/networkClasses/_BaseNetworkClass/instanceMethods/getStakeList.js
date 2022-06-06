import api from '../../../api'

// not supported by default
export const getStakeList = async function () {
  const { data } = await api.requests.getStakeList({
    net: this.net,
    address: this.address,
  })
  return data
}
