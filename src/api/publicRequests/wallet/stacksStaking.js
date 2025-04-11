import state from '../../../state'
import qs from 'qs'

// function returns request parameters for the axios instance.
export const stacksStaking = ({ address, publicKey }) => {
  return {
    url: `/blockchain/stacks/${address}/liquidStacking`,
    method: 'get',
    data: {
      params: {
        publicKey,
        version: state.getState('backendApiVersion'),
      },
      paramsSerializer: (params) => {
        return qs.stringify(params)
      },
    },
  }
}
