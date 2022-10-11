import state from '../../../state'
// function returns request parameters for the axios instance.
export const removeWallet = (walletId) => {
  return {
    // backend domain is in the axios instance
    url: `/wallets/${walletId}?version=${state.getState('backendApiVersion')}`,
    method: 'delete',
  }
}
