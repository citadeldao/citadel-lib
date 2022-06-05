export const claimXctRewards = ({ address }) => {
  return {
    url: `blockchain/bsc_xct/${address}/builder/claim_rewards`,
    method: 'get',
  }
}
