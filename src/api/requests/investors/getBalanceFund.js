import state from '../../../state'
import { OUR_TOKEN } from './../../../constants'

// function returns request parameters for the axios instance.
export const getBalanceFund = ({ address, category }) => ({
  // backend domain is in the axios instance
  url: `/blockchain/${OUR_TOKEN}/${address}/balance/fund`,
  method: 'get',
  data: {
    params: {
      category,
      version: state.getState('backendApiVersion'),
    },
  },
})
