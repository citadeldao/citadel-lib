// function returns request parameters for the axios instance.
export const prepareTransfer = ({ net, from, ...options }) => {
  return {
    // backend domain is in the axios instance
    url: `/blockchain/${encodeURIComponent(net)}/${from}/builder/transfer`,
    method: 'get',
    data: {
      params: {
        ...options,
      },
    },
  }
}
