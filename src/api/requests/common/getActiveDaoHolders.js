import state from '../../../state'

// function returns request parameters for the axios instance.
export const getActiveDaoHolders = () => {
  return {
    // backend domain is in the axios instance
    url: `/dao/activity,`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
