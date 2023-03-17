import state from '../../../state'

// function returns request parameters for the axios instance.
export const getTransactionByHash = ({
  net,
  address,
  hash,
}) => {
  return {
    // backend domain is in the axios instance
    url: `/transactions/${net}/${address}/hash/${hash}`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
      },
    },
  }
}