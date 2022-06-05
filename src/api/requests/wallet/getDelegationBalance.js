export const getDelegationBalance = ({ address, net }) => {
  return {
    url: `/transactions/${net}/${address}/delegation-balance-info`,
    method: 'get',
  }
}
