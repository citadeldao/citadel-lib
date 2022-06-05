export const getCustomWalletLists = () => ({
  url: `/wallets/lists`,
  method: 'get',
  data: {
    params: {
      version: '1.0.1',
    },
  },
})
