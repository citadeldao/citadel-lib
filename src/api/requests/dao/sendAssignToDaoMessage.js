// function returns request parameters for the axios instance.
export const sendAssignToDaoMessage = ({
  holderAddress,
  messageId,
  messageSignature,
}) => {
  return {
    // backend domain is in the axios instance
    // backend domain is in the axios instance
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
