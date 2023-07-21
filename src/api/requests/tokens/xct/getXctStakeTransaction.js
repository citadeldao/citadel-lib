import state from '../../../../state'
import { OUR_TOKEN } from './../../../../constants'

// function returns request parameters for the axios instance.
export const getXctStakeTransaction = ({ address, amount }) => {
  return {
    // backend domain is in the axios instance
    url: `/blockchain/${OUR_TOKEN}/${address}/builder/stake`,
    method: 'get',
    data: {
      params: {
        amount,
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
