// function returns request parameters for the axios instance.
export const prepareTransfer = ({ net, from, ...options }) => {
  return {
    // backend domain is in the axios instance
  url: `/transactions/${net}/${from}/prepare-transfer?version=1.1.0`,
    method: 'post',
    data: {
      ...options,
    },
  }
}
