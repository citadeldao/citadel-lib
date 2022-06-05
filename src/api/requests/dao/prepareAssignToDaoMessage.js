export const prepareAssignToDaoMessage = ({ net, address, publicKey }) => {
  return {
    url: `/dao/ask-verify-msg`,
    method: 'get',
    data: {
      params: {
        net,
        address,
        pubKey: publicKey,
      },
    },
  }
}
