import state from '../../../state'
import { OUR_TOKEN } from './../../../constants'

// function returns request parameters for the axios instance.
export const getPreparePrivateClaim = ({ address, category }) => ({
  // backend domain is in the axios instance
  url: `/blockchain/${OUR_TOKEN}/${address}/builder/claim_private_sale`,
  method: 'get',
  data: {
    params: {
      category,
      version: state.getState('backendApiVersion'),
    },
  },
})
