import state from '../../../state'
// function returns request parameters for the axios instance.
export const postTransactionNote = ({ net, transactionHash, text }) => ({
  // backend domain is in the axios instance
  url: `/transactions/${encodeURIComponent(net)}/note/${transactionHash}?version=${state.getState(
    'backendApiVersion'
  )}`,
  method: 'post',
  data: {
    text,
  },
})
