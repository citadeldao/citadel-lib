// function returns request parameters for the axios instance.
export const getBalanceFund = ({ address, category }) => ({
  // backend domain is in the axios instance
  url: `/blockchain/bsc_xct/${address}/balance/fund`,
  method: 'get',
  data: {
    params: {
      category,
    },
  },
})
