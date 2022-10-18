import state from '../../../state'
// function returns request parameters for the axios instance.
export const removeWallet = (walletId) => {
  return {
    // backend domain is in the axios instance
    url: `/wallets/${walletId}`,
    method: 'delete',
    data: {
      version: state.getState('backendApiVersion'),
    },
  }
}
