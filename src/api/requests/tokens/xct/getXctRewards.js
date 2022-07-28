// function returns request parameters for the axios instance.
export const getXctRewards = ({ address }) => {
    return {
      // backend domain is in the axios instance
      url: `/transactions/bsc_xct/${address}/rewards-claimable`,
      method: 'get',
    }
  }