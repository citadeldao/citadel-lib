export const buildBridge = ({ net, address, ...params }) => {
  return {
    url: `transactions/${net}/${address}/buildBridge`,
    method: 'get',
    data: {
      params,
    },
  }
}
