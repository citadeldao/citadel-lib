import state from '../../../state'
// function returns request parameters for the axios instance.
export const sendSignedTransaction = ({
  net,
  from,
  signedTransaction,
  type,
  mem_tx_id = null,
  proxy = false,
}) => {
  return {
    // backend domain is in the axios instance
    url: `/transactions/${net}/${from}/send?version=${state.getState('backendApiVersion')}`,
    method: 'post',
    data: {
      signedTransaction,
      type,
      mem_tx_id,
      proxy,
    },
  }
}
