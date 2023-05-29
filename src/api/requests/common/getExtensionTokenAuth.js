import state from '../../../state'

// function returns request parameters for the axios instance.
export const getExtensionTokenAuth = ({ id, wallets }) => ({
  // backend domain is in the axios instance
  url: `/profile/extension/${id}`,
  method: 'post',
  data: {
    wallets,
    params: {
      version: state.getState('backendApiVersion'),
    },
  },
})
