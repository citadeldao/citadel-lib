import state from '../../../state'

// function returns request parameters for the axios instance.
export const getWalletTransactions = ({
  net,
  address,
  params: { page = 1, pageSize = 10 } = {},
}) => {
  return {
    // backend domain is in the axios instance
    url: `/transactions/${encodeURIComponent(net)}/${address}`,
    method: 'get',
    data: {
      params: {
        offset: (page - 1) * pageSize,
        limit: pageSize,
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
