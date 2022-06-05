export const getStakeList = ({ net, address }) => {
  return {
    url: `/transactions/${net}/${address}/stake-list`,
    method: 'get',
  }
}
