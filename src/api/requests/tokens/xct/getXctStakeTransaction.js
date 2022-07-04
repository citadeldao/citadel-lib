// function returns request parameters for the axios instance.
export const getXctStakeTransaction = ({ address, amount }) => {
  return {
    // backend domain is in the axios instance
    url: `/blockchain/bsc_xct/${address}/builder/stake`,
    method: 'get',
    data: {
      params: {
        amount,
      },
    },
  }
}
