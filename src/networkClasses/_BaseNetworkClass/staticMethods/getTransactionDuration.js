import api from '../../../api'

// proxy request to backend
export const getTransactionDuration = async function ({ type, fee }) {
  const { data } = await api.requests.getTransactionDuration({
    type,
    fee,
    net: this.net,
  })
  return data
}
