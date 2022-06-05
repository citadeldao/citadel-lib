export const claimAllRewards = ({ address }) => {
  return {
    url: `blockchain/bsc_xct/${address}/builder/claim_all_rewards`,
    method: 'get',
  }
}
