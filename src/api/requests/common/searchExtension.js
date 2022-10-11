import state from '../../../state'

// function returns request parameters for the axios instance.
export const searchExtension = ({ query }) => ({
  // backend domain is in the axios instance
  url: `/extensions/search`,
  method: 'get',
  data: {
    params: {
      query,
      version: state.getState('backendApiVersion'),
    },
  },
})
