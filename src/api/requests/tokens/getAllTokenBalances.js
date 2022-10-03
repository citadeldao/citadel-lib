// function returns request parameters for the axios instance.
export const getAllTokenBalances = ({ net, address }) => {
  return {
    // backend domain is in the axios instance
    url: `/transactions/${net}/${address}/tokens`,
    method: 'get',
    data: {
      params: {
        version: '1.1.0',
      },
    },
  }
}
