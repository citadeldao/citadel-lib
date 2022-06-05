export const getPreparePrivateClaim = ({ address, category }) => ({
  url: `/blockchain/bsc_xct/${address}/builder/claim_private_sale`,
  method: 'get',
  data: {
    params: {
      category,
    },
  },
})
