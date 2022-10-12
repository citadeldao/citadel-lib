import state from '../../../state'

// function returns request parameters for the axios instance.
export const getPrivateSale = ({ address, category }) => ({
  // backend domain is in the axios instance
  url: `/blockchain/bsc_xct/${address}/balance/private_sale`,
  method: 'get',
  data: {
    params: {
      category,
      version: state.getState('backendApiVersion'),
    },
  },
})
