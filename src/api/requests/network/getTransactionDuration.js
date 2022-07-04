// function returns request parameters for the axios instance.
export const getTransactionDuration = ({ type, net, fee }) => ({
  // backend domain is in the axios instance
  url: `/transactions/mempool/${net}/duration`,
  method: 'get',
  data: {
    params: {
      type,
      fee,
    },
  },
})
