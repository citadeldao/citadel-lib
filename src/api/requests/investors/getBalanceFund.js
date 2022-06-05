export const getBalanceFund = ({ address, category }) => ({
  url: `/blockchain/bsc_xct/${address}/balance/fund`,
  method: 'get',
  data: {
    params: {
      category,
    },
  },
})
