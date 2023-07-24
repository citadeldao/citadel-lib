import state from '../../../state'

// function returns request parameters for the axios instance.
export const getMarketcap = (data) => {
  return {
    // backend domain is in the axios instance
    url: `/currency/${encodeURIComponent(data.net)}/marketcap`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
