import state from '../../../state'

// function returns request parameters for the axios instance.
export const getSubtokensConfigByNet = ({net}) => {
  return {
    // backend domain is in the axios instance
    url: `/configs/tokens/${net}`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
      },
    },
  }
}