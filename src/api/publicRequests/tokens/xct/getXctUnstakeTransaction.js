import state from '../../../../state'

// function returns request parameters for the axios instance.
export const getXctUnstakeTransaction = ({ address, amount }) => {
  return {
    // backend domain is in the axios instance
    url: `/blockchain/bsc_xct/${address}/builder/unstake`,
    method: 'get',
    data: {
      params: {
        amount,
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
