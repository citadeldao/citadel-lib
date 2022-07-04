// function returns request parameters for the axios instance.
export const getRewards = () => ({
  // backend domain is in the axios instance
  url: `/profile/rewards`,
  method: 'get',
});