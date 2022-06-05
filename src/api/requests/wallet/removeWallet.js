export const removeWallet = (walletId) => {
  return {
    url: `/wallets/${walletId}`,
    method: 'delete',
  }
}
