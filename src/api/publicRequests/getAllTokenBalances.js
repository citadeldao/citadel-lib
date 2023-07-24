// function returns request parameters for the axios instance.
export const getAllTokenBalances = ({ net, address }) => {
  return {
    // backend domain is in the axios instance
    url: `/blockchain/${encodeURIComponent(net)}/${address}/tokens`,
    method: 'get',
  }
}
