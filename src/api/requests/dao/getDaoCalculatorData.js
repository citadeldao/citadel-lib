import state from '../../../state'

// function returns request parameters for the axios instance.
export const getDaoCalculatorData = ({ address }) => ({
  // backend domain is in the axios instance
  url: `/dao/holder/${address}/calc`,
  method: 'get',
  data: {
    params: {
      version: state.getState('backendApiVersion'),
    },
  },
})
