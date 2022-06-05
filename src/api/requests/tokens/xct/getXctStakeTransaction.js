export const getXctStakeTransaction = ({ address, amount }) => {
  return {
    url: `/blockchain/bsc_xct/${address}/builder/stake`,
    method: 'get',
    data: {
      params: {
        amount,
      },
    },
  }
}
