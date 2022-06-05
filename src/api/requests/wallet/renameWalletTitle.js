export const renameWalletTitle = (data) => {
  return {
    url: `/wallets/rename`,
    method: 'post',
    data
  }
}