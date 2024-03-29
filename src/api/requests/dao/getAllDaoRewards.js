import state from '../../../state'

// function returns request parameters for the axios instance.
export const getAllDaoRewards = ({ address }) => ({
  // backend domain is in the axios instance
  url: `/dao/rewardsHistoryOverall/${address}`,
  method: 'get',
  data: {
    params: {
      version: state.getState('backendApiVersion'),
    },
  },
})
