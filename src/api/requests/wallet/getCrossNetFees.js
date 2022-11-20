import state from '../../../state'
// function returns request parameters for the axios instance.
export const getCrossNetFees = ({ netFrom, netTo }) => ({
  // backend domain is in the axios instance
  url: `/currency/${netFrom}_${netTo}/fees`,
  method: 'get',
  data: {
    params: {
      version: state.getState('backendApiVersion'),
    },
  },
})