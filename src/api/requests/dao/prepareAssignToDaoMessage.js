import state from '../../../state'

// function returns request parameters for the axios instance.
export const prepareAssignToDaoMessage = ({ net, address, publicKey }) => {
  return {
    // backend domain is in the axios instance
    // backend domain is in the axios instance
    url: `/dao/ask-verify-msg`,
    method: 'get',
    data: {
      params: {
        net,
        address,
        pubKey: publicKey,
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
