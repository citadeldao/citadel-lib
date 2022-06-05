export const deleteCustomWalletList = ({ listId }) => ({
  url: `/wallets/lists/${listId}`,
  method: 'delete',
  data: {
    params: {
      version: '1.0.1',
    },
  },
})
