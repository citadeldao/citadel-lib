import api from '../../../api'

// proxy request to backend
export const getCurrencyHistoryByRange = async function (dateFrom, dateTo, fiat) {
  const { data } = await api.requests.getCurrencyHistoryByRange({
    net: this.net,
    dateFrom,
    dateTo,
    fiat
  })
  return data
}
