import api from '../../../api'

// proxy request to backend
export const getCurrencyHistoryByRange = async function (dateFrom, dateTo) {
  const { data } = await api.requests.getCurrencyHistoryByRange({
    net: this.net,
    dateFrom,
    dateTo,
  })
  return data
}
