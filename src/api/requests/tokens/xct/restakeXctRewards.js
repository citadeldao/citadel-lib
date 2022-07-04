// function returns request parameters for the axios instance.
export const restakeXctRewards = ({ address }) => {
  return {
    // backend domain is in the axios instance
    url: `blockchain/bsc_xct/${address}/builder/restake`,
    method: 'get',
  }
}
