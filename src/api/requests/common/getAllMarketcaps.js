import state from '../../../state'

// function returns request parameters for the axios instance.
export const getAllMarketcaps = () => {
  return {
    // backend domain is in the axios instance
    url: `/currency/marketcap`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
