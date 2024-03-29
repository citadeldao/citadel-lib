import state from '../../../state'

// function returns request parameters for the axios instance.
export const getTransactionDuration = ({ type, net, fee }) => ({
  // backend domain is in the axios instance
  url: `/transactions/mempool/${encodeURIComponent(net)}/duration`,
  method: 'get',
  data: {
    params: {
      version: state.getState('backendApiVersion'),
      type,
      fee,
    },
  },
})
