export const prepareTransfer = ({ net, from, ...options }) => {
  return {
    url: `/transactions/${net}/${from}/prepare-transfer?version=1.0.5`,
    method: 'post',
    data: {
      ...options,
    },
  }
}
