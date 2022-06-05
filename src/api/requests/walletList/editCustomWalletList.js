export const editCustomWalletList = ({ listId, name, wallets }) => ({
  url: `/wallets/lists/${listId}?version=1.0.1`,
  method: 'post',
  data: {
    name,
    wallets,
  },
})
