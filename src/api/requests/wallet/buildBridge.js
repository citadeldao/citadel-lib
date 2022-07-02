// function returns request parameters for the axios instance.
export const buildBridge = ({ net, address, ...params }) => {
  return {
    // backend domain is in the axios instance
    url: `transactions/${net}/${address}/buildBridge`,
    method: 'get',
    data: {
      params,
    },
  }
}
