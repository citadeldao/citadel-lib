// function returns request parameters for the axios instance.
export const getStakeList = ({ net, address }) => {
  return {
    // backend domain is in the axios instance
    url: `/blockchain/${encodeURIComponent(net)}/${address}/stake-list`,
    method: 'get',
  }
}
