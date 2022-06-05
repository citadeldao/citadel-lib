export const getStakeNodes = () => {
  return {
    url: `/staking-node`,
    method: 'get',
    data: {
      params: {
        version: '1.0.4',
      },
    },
  }
}
