import state from '../../../state'

// function returns request parameters for the axios instance.
export const subscribeRewards = ({ newValue }) => ({
  url: `/profile/subscribe/rewards?version=${state.getState(
    'backendApiVersion'
  )}`,
  method: 'post',
  data: { subscribe_rewards: newValue },
})
