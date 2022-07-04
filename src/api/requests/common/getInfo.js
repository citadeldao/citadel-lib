// function returns request parameters for the axios instance.
export const getInfo = () => {
  return {
    // backend domain is in the axios instance
    url: `/profile/info`,
    method: 'get',
  }
}