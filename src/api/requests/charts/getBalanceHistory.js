export const getBalanceHistory = ({ dateFrom, dateTo, listId }) => {
  return {
    url: `/profile/balance-history`,
    method: 'get',
    data: {
      params: {
        version: '1.0.1',
        date_from: dateFrom,
        date_to: dateTo,
        listId,
      },
    },
  }
}
