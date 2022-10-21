import api from '../../../api'

// by default - proxy request to backend
export const buildCustomTransaction = async function (options) {
  const { data } = await api.requests.buildCustomTransaction({
    net: this.net,
    address: this.address,
    publicKey: this.publicKey,
    ...options,
  })

  return data
}
