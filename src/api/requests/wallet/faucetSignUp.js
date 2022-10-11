import state from '../../../state'
// function returns request parameters for the axios instance.
export const faucetSignUp = ({ net, name, publicKey }) => ({
  // backend domain is in the axios instance
  url: `/transactions/${net}/faucet-sign-up?version=${state.getState(
    'backendApiVersion'
  )}`,
  method: 'post',
  data: {
    name,
    publicKey,
  },
})
