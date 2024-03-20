export const getEvmApprove = ({ net, address, tokenAddress, spenderAddress, amount }) => {
  return {
    // backend domain is in the axios instance
    url: `/blockchain/${encodeURIComponent(net)}/${address}/builder/erc20Approve`,
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
