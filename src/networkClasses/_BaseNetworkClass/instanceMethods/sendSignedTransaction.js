import api from '../../../api'

export const sendSignedTransaction = async function (options) {
  const { data } = await api.requests.sendSignedTransaction({
    net: this.net,
    from: this.address,
    type: this.type,
    ...options,
  })
  return data
}