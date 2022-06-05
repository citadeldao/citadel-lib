export const subscribeRewards = ({ newValue }) => ({
  url: `/profile/subscribe/rewards`,
  method: 'post',
  data: { subscribe_rewards: newValue },
})
