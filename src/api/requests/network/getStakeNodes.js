// function returns request parameters for the axios instance.
export const getStakeNodes = () => {
  return {
      // backend domain is in the axios instance
    url: `/staking-node`,
    method: 'get',
    data: {
      params: {
        version: '1.0.4',
      },
    },
  }
}
