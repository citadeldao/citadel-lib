export const restakeDaoRewards = ({ address }) => {
  return {
    url: `blockchain/bsc_xct/${address}/builder/restake_staking_rewards`,
    method: 'get',
  }
}
