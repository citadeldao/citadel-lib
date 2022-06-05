import api from '../../../../api'

export default async function({ type, fee }) {
  const { data } = await api.requests.getTransactionDuration({
    type,
    fee,
    net: this.net,
  })
  return data
}
