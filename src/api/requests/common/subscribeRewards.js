import state from '../../../state'

// function returns request parameters for the axios instance.
export const subscribeRewards = ({ newValue }) => ({
  url: `/profile/subscribe/rewards`,
  method: 'post',
  data: {
    subscribe_rewards: newValue,
    version: state.getState('backendApiVersion'),
  },
})
