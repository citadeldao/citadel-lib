// function returns request parameters for the axios instance.
export const getWalletsDetail = () => {
  return {
    // backend domain is in the axios instance
    url: `/wallets/detail`,
    method: 'get',
  };
};
