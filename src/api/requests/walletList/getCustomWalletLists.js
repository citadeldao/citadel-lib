export const getCustomWalletLists = () => ({
  // backend domain is in the axios instance
  url: `/wallets/lists`,
  method: 'get',
  data: {
    params: {
      version: '1.0.1',
    },
  },
})
