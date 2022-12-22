import state from '../../../state'
import qs from 'qs'

// function returns request parameters for the axios instance.
export const buildCustomTransaction = ({ net, address, publicKey, data }) => {
  return {
    // backend domain is in the axios instance
    url: `transactions/${net}/${address}/buildCustomTx`,
    method: 'get',
    data: {
      params: {
        data,
        publicKey,
        version: state.getState('backendApiVersion'),
      },
      paramsSerializer: (params) => {
        return qs.stringify(params)
      },
    },
  }
}
