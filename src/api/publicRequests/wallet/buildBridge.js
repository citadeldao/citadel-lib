import state from '../../../state'

// function returns request parameters for the axios instance.
export const buildBridge = ({ net, address, ...params }) => {
  return {
    // backend domain is in the axios instance
    // url: `transactions/${net}/${address}/buildBridge`,
    url: `/blockchain/${net}/${address}/builder/bridge`,
    method: 'get',
    data: {
      params: {
        ...params,
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
