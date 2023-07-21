import state from '../../../state'
import { OUR_TOKEN } from './../../../constants'

// function returns request parameters for the axios instance.
export const getPrepareTransferFund = ({
  address,
  category,
  amount,
  recipient,
}) => ({
  // backend domain is in the axios instance
  url: `/blockchain/${OUR_TOKEN}/${address}/builder/transfer_fund`,
  method: 'get',
  data: {
    params: {
      category,
      amount,
      recipient,
      version: state.getState('backendApiVersion'),
    },
  },
})
