export const getEvmApprove = ({ tokenAddress, spenderAddress, amount }) => {
  return {
    // backend domain is in the axios instance
    url: `/blockchain/${encodeURIComponent(data.net)}/${data.address}/builder/erc20Approve`,
    method: 'get',
    data: {
      params: {
        tokenAddress,
        spenderAddress,
        amount,
      },
    },
  }
}
