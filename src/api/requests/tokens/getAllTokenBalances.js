export const getAllTokenBalances = ({ net, address }) => {
  return {
    url: `/transactions/${net}/${address}/tokens`,
    method: 'get',
  }
}
