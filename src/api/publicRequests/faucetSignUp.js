// function returns request parameters for the axios instance.
export const faucetSignUp = ({ net, name, publicKey }) => ({
  // backend domain is in the axios instance
  url: `/blockchain/${encodeURIComponent(net)}/faucet-sign-up`,
  method: 'get',
  data: {
    params: {
      name,
      publicKey,
    },
  },
})
