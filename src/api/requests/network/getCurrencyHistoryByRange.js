import state from '../../../state'

// function returns request parameters for the axios instance.
export const getCurrencyHistoryByRange = ({ net, dateFrom, dateTo, fiat = 'usd' }) => ({
  // backend domain is in the axios instance
  url: `currency/history`,
  method: 'get',
  data: {
    params: {
      net,
      fiat,
      from_date: dateFrom,
      to_date: dateTo,
      version: state.getState('backendApiVersion'),
    },
  },
})
