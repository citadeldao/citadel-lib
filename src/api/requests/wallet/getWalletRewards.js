import state from '../../../state'

// function returns request parameters for the axios instance.
export const getWalletRewards = ({ net, address }) => {
  return {
    // backend domain is in the axios instance
    url: `/transactions/rewards/${net}/${address}`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
      },
    },
  }
}