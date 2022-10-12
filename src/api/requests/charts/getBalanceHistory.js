import state from '../../../state'

// function returns request parameters for the axios instance.
export const getBalanceHistory = ({ dateFrom, dateTo, listId }) => {
  return {
    // backend domain is in the axios instance
    url: `/profile/balance-history`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
        date_from: dateFrom,
        date_to: dateTo,
        listId,
      },
    },
  }
}
