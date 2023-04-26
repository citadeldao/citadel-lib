// function returns request parameters for the axios instance.
export const executeCoingecko = (route) => ({
    // backend domain is in the axios instance
    url: `/execute/coingecko`,
    method: 'post',
    data: {
        route
    },
  })