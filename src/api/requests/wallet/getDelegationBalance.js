// function returns request parameters for the axios instance.
export const getDelegationBalance = ({ address, net }) => {
  return {
    // backend domain is in the axios instance
    url: `/transactions/${net}/${address}/delegation-balance-info`,
    method: 'get',
  }
}
