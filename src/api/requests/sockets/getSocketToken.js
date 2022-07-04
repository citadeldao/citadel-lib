// function returns request parameters for the axios instance.
export const getSocketToken = () => ({
  // backend domain is in the axios instance
  url: `/profile/socket`,
  method: 'get',
});