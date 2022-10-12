import state from '../../../../state'

// function returns request parameters for the axios instance.
export const claimAllRewards = ({ address }) => {
  return {
    // backend domain is in the axios instance
    url: `blockchain/bsc_xct/${address}/builder/claim_all_rewards`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
