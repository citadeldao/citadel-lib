import state from '../../../state'

export const editCustomWalletList = ({ listId, name, wallets }) => ({
  // backend domain is in the axios instance
  url: `/wallets/lists/${listId}`,
  method: 'post',
  data: {
    name,
    wallets,
    version: state.getState('backendApiVersion'),
  },
})
