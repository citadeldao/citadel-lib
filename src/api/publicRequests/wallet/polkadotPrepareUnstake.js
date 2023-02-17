import state from '../../../state'
// function returns request parameters for the axios instance.
export const polkadotPrepareUnstake = (data) => ({
  // backend domain is in the axios instance
  // url: `/transactions/polkadot/${data.address}/prepareUnstake`,
  url: `/blockchain/polkadot/${data.address}/builder/unstake`,
  method: 'get',
  data: {
    params: {
      amount: data.amount,
      tip: data.tip,
      version: state.getState('backendApiVersion'),
    },
  },
})
