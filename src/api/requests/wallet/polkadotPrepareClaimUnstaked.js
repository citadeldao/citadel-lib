import state from '../../../state'
// function returns request parameters for the axios instance.
export const polkadotPrepareClaimUnstaked = (data) => ({
  // backend domain is in the axios instance
  url: `/transactions/polkadot/${data.address}/prepareClaimUnstaked`,
  method: 'get',
  data: {
    params: {
      version: state.getState('backendApiVersion'),
    },
  },
})
