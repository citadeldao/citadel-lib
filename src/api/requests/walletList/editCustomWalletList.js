import state from '../../../state'

export const editCustomWalletList = ({ listId, name, wallets }) => ({
  // backend domain is in the axios instance
  url: `/wallets/lists/${listId}?version=${state.getState(
    'backendApiVersion'
  )}`,
  method: 'post',
  data: {
    name,
    wallets,
  },
})
