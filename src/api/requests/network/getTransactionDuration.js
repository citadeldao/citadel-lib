export const getTransactionDuration = ({ type, net, fee }) => ({
  url: `/transactions/mempool/${net}/duration`,
  method: 'get',
  data: {
    params: {
      type,
      fee,
    },
  },
})
