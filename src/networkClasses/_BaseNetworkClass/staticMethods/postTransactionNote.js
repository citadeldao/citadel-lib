import api from '../../../api'

// proxy request to backend
export const postTransactionNote = async function (transactionHash, text) {
  const { data } = await api.requests.postTransactionNote({
    net: this.net,
    transactionHash,
    text,
  })
  return data
}
