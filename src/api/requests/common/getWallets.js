// function returns request parameters for the axios instance.
export const getWallets = () => {
  return {
    // backend domain is in the axios instance
    url: `/wallets`,
    method: 'get',
  };
};
