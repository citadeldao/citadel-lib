import state from '../../../state'

// function returns request parameters for the axios instance.
export const getCurrency = (data) => {
  return {
    // backend domain is in the axios instance
    url: `/currency/${encodeURIComponent(data.net)}`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
