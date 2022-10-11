import state from '../../../state'

export const getCustomWalletLists = () => ({
  // backend domain is in the axios instance
  url: `/wallets/lists`,
  method: 'get',
  data: {
    params: {
      version: state.getState('backendApiVersion'),
    },
  },
})
