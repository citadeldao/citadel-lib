import state from '../../../state'

export const createCustomWalletList = ({ name, wallets }) => ({
  // backend domain is in the axios instance
  url: `/wallets/lists?version=${state.getState('backendApiVersion')}`,
  method: 'post',
  data: {
    name,
    wallets,
  },
})
