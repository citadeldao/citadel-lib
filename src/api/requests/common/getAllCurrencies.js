import state from '../../../state'

// function returns request parameters for the axios instance.
export const getAllCurrencies = () => {
  return {
    // backend domain is in the axios instance
    url: `/currency`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
