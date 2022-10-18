import state from '../../../state'
// function returns request parameters for the axios instance.
export const renameWalletTitle = (data) => {
  return {
    // backend domain is in the axios instance
    url: `/wallets/rename`,
    method: 'post',
    data: {
      ...data,
      version: state.getState('backendApiVersion'),
    },
  }
}
