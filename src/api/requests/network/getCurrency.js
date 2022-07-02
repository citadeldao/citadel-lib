// function returns request parameters for the axios instance.
export const getCurrency = (data) => {
  return {
      // backend domain is in the axios instance
    url: `/currency/${data.net}`,
    method: 'get',
  }
}