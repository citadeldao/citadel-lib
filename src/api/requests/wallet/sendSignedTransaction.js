export const sendSignedTransaction = ({
  net,
  from,
  signedTransaction,
  type,
  mem_tx_id = null,
  proxy = false,
}) => {
  return {
    url: `/transactions/${net}/${from}/send`,
    method: 'post',
    data: {
      signedTransaction,
      type,
      mem_tx_id,
      proxy,
    },
  }
}
