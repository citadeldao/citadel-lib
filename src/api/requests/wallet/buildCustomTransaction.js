import state from '../../../state'
import qs from 'qs'

// function returns request parameters for the axios instance.
export const buildCustomTransaction = ({ net, address, data }) => {
  return {
    // backend domain is in the axios instance
    url: `transactions/${net}/${address}/buildCustomTx`,
    method: 'get',
    data: {
      params: {
        data,
        version: state.getState('backendApiVersion'),
      },
      paramsSerializer: (params) => {
        return qs.stringify(params)
      },
    },
  }
}
