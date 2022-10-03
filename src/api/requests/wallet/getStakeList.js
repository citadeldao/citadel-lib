// function returns request parameters for the axios instance.
export const getStakeList = ({ net, address }) => {
  return {
    // backend domain is in the axios instance
    url: `/transactions/${net}/${address}/stake-list`,
    method: 'get',
    data: {
      params: {
        version: '1.1.0',
      },
    },
  }
}
