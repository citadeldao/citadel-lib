export const faucetSignUp = ({ net, name, publicKey }) => ({
  url: `/transactions/${net}/faucet-sign-up`,
  method: 'post',
  data: {
    name,
    publicKey,
  },
});