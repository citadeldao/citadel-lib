export const restakeXctRewards = ({ address }) => {
  return {
    url: `blockchain/bsc_xct/${address}/builder/restake`,
    method: 'get',
  }
}
