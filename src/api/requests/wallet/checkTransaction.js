export const checkTransaction = ({ net, hash }) => ({
  url: `/transactions/${net}/check/${hash}`,
  method: 'get',
})
