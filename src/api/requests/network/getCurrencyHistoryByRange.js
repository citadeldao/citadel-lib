export const getCurrencyHistoryByRange = ({ net, dateFrom, dateTo }) => ({
  url: `currency/history`,
  method: 'get',
  data: {
    params: {
      net,
      fiat: 'usd',
      from_date: dateFrom,
      to_date: dateTo,
    },
  },
})
