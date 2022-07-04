// function returns request parameters for the axios instance.
export const postTransactionNote = ({ net, transactionHash, text }) => ({
  // backend domain is in the axios instance
  url: `/transactions/${net}/note/${transactionHash}`,
  method: 'post',
  data: {
    text,
  },
})
