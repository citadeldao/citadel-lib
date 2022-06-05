export const getXctUnstakeTransaction = ({ address, amount }) => {
  return {
    url: `/blockchain/bsc_xct/${address}/builder/unstake`,
    method: 'get',
    data: {
      params: {
        amount,
      },
    },
  }
}
