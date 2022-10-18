import state from '../../../state'

export const deleteCustomWalletList = ({ listId }) => ({
  // backend domain is in the axios instance
  url: `/wallets/lists/${listId}?version=${state.getState('backendApiVersion')}`,
  method: 'delete',
})
