export const getEvmAllowance = ({ net, address, tokenAddress, spenderAddress }) => {
  return {
    // backend domain is in the axios instance
    url: `/blockchain/${encodeURIComponent(net)}/${address}/erc20Allowance`,
    method: 'get',
    data: {
      params: {
        tokenAddress,
        spenderAddress,
      },
    },
  }
}
