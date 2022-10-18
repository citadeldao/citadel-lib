import state from '../../../state'

export const createCustomWalletList = ({ name, wallets }) => ({
  // backend domain is in the axios instance
  url: `/wallets/lists`,
  method: 'post',
  data: {
    name,
    wallets,
    version: state.getState('backendApiVersion'),
  },
})
