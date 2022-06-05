export const postTransactionNote = ({ net, transactionHash, text }) => ({
  url: `/transactions/${net}/note/${transactionHash}`,
  method: 'post',
  data: {
    text,
  },
})
