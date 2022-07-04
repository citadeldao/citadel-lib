// function returns request parameters for the axios instance.
export const getCurrencyHistoryByRange = ({ net, dateFrom, dateTo }) => ({
  // backend domain is in the axios instance
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
