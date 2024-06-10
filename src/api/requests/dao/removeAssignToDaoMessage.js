import state from '../../../state'

export const removeAssignToDaoMessage = ({
  holderAddress,
  messageId,
  messageSignature,
}) => {
  return {
    url: `/dao/holder/${holderAddress}/wallets?version=${state.getState(
      'backendApiVersion'
    )}`,
    method: 'delete',
    data: {
      data: {
        sign: {
          id: messageId,
          signature: messageSignature,
        },
      }
    },
  }
}
