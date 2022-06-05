export const getTotalClaimedRewardsXct = ({ address }) => {
  return {
    url: `blockchain/bsc_xct/${address}/total_claimed_rewards`,
    method: 'get',
  }
}