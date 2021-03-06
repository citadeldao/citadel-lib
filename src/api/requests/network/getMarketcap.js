// function returns request parameters for the axios instance.
export const getMarketcap = (data) => {
  return {
    // backend domain is in the axios instance
    url: `/currency/${data.net}/marketcap`,
    method: 'get',
  }
}
