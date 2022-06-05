export const createCustomWalletList = ({ name, wallets }) => ({
  url: `/wallets/lists?version=1.0.1`,
  method: 'post',
  data: {
    name,
    wallets,
  },
})
