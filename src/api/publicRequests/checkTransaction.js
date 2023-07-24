// function returns request parameters for the axios instance.
export const checkTransaction = ({ net, hash }) => ({
    // backend domain is in the axios instance
    url: `/blockchain/${encodeURIComponent(net)}/check/${hash}`,
    method: 'get',
  })