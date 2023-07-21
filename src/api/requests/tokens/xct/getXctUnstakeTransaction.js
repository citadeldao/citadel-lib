import state from '../../../../state'
import { OUR_TOKEN } from './../../../../constants'

// function returns request parameters for the axios instance.
export const getXctUnstakeTransaction = ({ address, amount }) => {
  return {
    // backend domain is in the axios instance
    url: `/blockchain/${OUR_TOKEN}/${address}/builder/unstake`,
    method: 'get',
    data: {
      params: {
        amount,
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
