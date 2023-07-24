// function returns request parameters for the axios instance.
export const prepareClaim = (data) => {
  return {
    // backend domain is in the axios instance
    url: `/blockchain/${encodeURIComponent(data.net)}/${data.address}/builder/claim-reward`,
    method: 'get',
  }
}
