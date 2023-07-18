import state from '../../../state'
//TODO GRISH
// function returns request parameters for the axios instance.
export const getNewNetworksConfig = () => {
  return {
    // backend domain is in the axios instance
    url: `/configs/networks`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
      },
    },
  }
}