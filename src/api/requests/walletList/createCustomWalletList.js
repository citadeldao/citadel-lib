export const createCustomWalletList = ({ name, wallets }) => ({
  // backend domain is in the axios instance
  url: `/wallets/lists?version=1.0.1`,
  method: 'post',
  data: {
    name,
    wallets,
  },
})
