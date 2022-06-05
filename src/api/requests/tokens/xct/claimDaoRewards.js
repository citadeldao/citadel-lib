export const claimDaoRewards = ({ address }) => {
  return {
    url: `/dao/holder/${address}/builder/claim_rewards`,
    method: 'get',
  }
}
