import state from '../../../state'
// function returns request parameters for the axios instance.
export const getFees = ({ net }) => ({
  // backend domain is in the axios instance
  url: `/currency/${encodeURIComponent(net)}/fees`,
  method: 'get',
  data: {
    params: {
      version: state.getState('backendApiVersion'),
    },
  },
})
