export const addWallet = (data) => {
  return {
    url: `/wallets`,
    method: 'put',
    data,
  }
}
