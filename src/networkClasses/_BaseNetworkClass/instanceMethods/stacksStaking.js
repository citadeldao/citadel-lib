import api from '../../../api'

// by default - proxy request to backend
export const stacksStaking = async function (data) {
  const { data: responseData } = await api.requests.stacksStaking({
    net: this.net,
    address: this.address,
    publicKey: this.publicKey,
  })

  return responseData
}
