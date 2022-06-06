import api from '../../../api'

// by default - proxy request to backend
export const prepareTransfer = async function (options) {
  const { data } = await api.requests.prepareTransfer({
    net: this.net,
    from: this.address,
    publicKey: this.publicKey,
    ...options,
  })
  return data
}
