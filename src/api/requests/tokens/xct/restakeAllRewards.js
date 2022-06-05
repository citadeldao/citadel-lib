export const restakeAllRewards = ({ address }) => {
  return {
    url: `blockchain/bsc_xct/${address}/builder/restake_all_rewards`,
    method: 'get',
  }
}
