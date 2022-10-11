import state from '../../../state'

export const deleteCustomWalletList = ({ listId }) => ({
  // backend domain is in the axios instance
  url: `/wallets/lists/${listId}`,
  method: 'delete',
  data: {
    params: {
      version: state.getState('backendApiVersion'),
    },
  },
})
