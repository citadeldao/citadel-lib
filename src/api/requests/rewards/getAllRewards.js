import state from '../../../state'

// function returns request parameters for the axios instance.
export const getAllRewards = () => ({
  // backend domain is in the axios instance
  url: `/transactions/rewards-all`,
  method: 'get',
  data: {
    params: {
      version: state.getState('backendApiVersion'),
    },
  },
})
