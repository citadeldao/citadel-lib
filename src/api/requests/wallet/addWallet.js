import state from '../../../state'

// function returns request parameters for the axios instance.
export const addWallet = (data) => {
  return {
    // backend domain is in the axios instance
    url: `/wallets?version=${state.getState('backendApiVersion')}`,
    method: 'put',
    data,
  }
}
