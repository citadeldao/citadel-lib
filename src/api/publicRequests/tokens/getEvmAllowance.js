export const getEvmAllowance = ({ tokenAddress, spenderAddress }) => {
  return {
    // backend domain is in the axios instance
    url: `/blockchain/${encodeURIComponent(data.net)}/${data.address}/erc20Allowance`,
    method: 'get',
    data: {
      params: {
        tokenAddress,
        spenderAddress,
      },
    },
  }
}
