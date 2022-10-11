import state from '../../../state'

// function returns request parameters for the axios instance.
export const getDaoRewardsByRange = ({ address, date_from, date_to }) => ({
  // backend domain is in the axios instance
  url: `/dao/rewardsHistory/${address}`,
  method: 'get',
  data: {
    params: {
      date_from,
      date_to,
      groups: 0,
      version: state.getState('backendApiVersion'),
    },
  },
})
