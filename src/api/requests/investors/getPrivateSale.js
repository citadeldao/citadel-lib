export const getPrivateSale = ({ address, category }) => ({
  url: `/blockchain/bsc_xct/${address}/balance/private_sale`,
  method: 'get',
  data: {
    params: {
      category,
    },
  },
})
