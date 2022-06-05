export const sendAssignToDaoMessage = ({
  holderAddress,
  messageId,
  messageSignature,
}) => {
  return {
    url: `/dao/holder/${holderAddress}/wallets`,
    method: 'put',
    data: {
      sign: {
        id: messageId,
        signature: messageSignature,
      },
    },
  }
}
