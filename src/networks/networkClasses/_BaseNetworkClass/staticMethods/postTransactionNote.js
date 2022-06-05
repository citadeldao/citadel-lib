import api from '../../../../api'

export default async function(transactionHash, text) {
  const { data } = await api.requests.postTransactionNote({
    net: this.net,
    transactionHash,
    text,
  })
  return data
}
