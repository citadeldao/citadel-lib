import state from '../../../../state'

// function returns request parameters for the axios instance.
export const getTotalClaimedRewardsXct = ({ address }) => {
  return {
    // backend domain is in the axios instance
    url: `blockchain/bsc_xct/${address}/total_claimed_rewards`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
