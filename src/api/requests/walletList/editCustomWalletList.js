export const editCustomWalletList = ({ listId, name, wallets }) => ({
  // backend domain is in the axios instance
  url: `/wallets/lists/${listId}?version=1.0.1`,
  method: 'post',
  data: {
    name,
    wallets,
  },
})
