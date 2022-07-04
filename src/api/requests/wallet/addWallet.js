// function returns request parameters for the axios instance.
export const addWallet = (data) => {
  return {
    // backend domain is in the axios instance
    url: `/wallets`,
    method: 'put',
    data,
  }
}
