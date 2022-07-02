export const deleteCustomWalletList = ({ listId }) => ({
  // backend domain is in the axios instance
  url: `/wallets/lists/${listId}`,
  method: 'delete',
  data: {
    params: {
      version: '1.0.1',
    },
  },
})
