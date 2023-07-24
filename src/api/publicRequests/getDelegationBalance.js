// function returns request parameters for the axios instance.
export const getDelegationBalance = (data) => {
  return {
    // backend domain is in the axios instance
    url: `/blockchain/${encodeURIComponent(data.net)}/${data.address}/balance`,
    method: 'get',
  }
}
