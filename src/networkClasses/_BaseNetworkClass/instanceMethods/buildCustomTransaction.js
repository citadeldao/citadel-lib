import api from '../../../api'

// by default - proxy request to backend
export const buildCustomTransaction = async function (data) {
  const { data: responseData } = await api.requests.buildCustomTransaction({
    net: this.net,
    address: this.address,
    publicKey: this.publicKey,
    data,
  })

  return responseData
}
