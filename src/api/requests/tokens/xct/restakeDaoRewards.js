// function returns request parameters for the axios instance.
export const restakeDaoRewards = ({ address }) => {
  return {
    // backend domain is in the axios instance
    url: `blockchain/bsc_xct/${address}/builder/restake_staking_rewards`,
    method: 'get',
  }
}
