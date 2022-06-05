import api from '../../../../api'

export default async function(dateFrom, dateTo) {
  const { data } = await api.requests.getCurrencyHistoryByRange({
    net: this.net,
    dateFrom,
    dateTo,
  })
  return data
}
