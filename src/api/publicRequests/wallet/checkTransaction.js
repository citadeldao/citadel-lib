import state from '../../../state'
// function returns request parameters for the axios instance.
export const checkTransaction = ({ net, hash }) => ({
  // backend domain is in the axios instance
  // url: `/transactions/${net}/check/${hash}`,
  url: `/blockchain/${net}/check/${hash}`,
  method: 'get',
  data: {
    params: {
      version: state.getState('backendApiVersion'),
    },
  },
})
