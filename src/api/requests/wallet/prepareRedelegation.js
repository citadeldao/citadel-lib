import state from '../../../state'
// function returns request parameters for the axios instance.
export const prepareRedelegation = ({
  net,
  address,
  from,
  to,
  amount,
  publicKey,
  isTyped,
}) => {
  return {
    // backend domain is in the axios instance
    url: `transactions/${net}/${address}/prepare-redelegation`,
    method: 'post',
    data: {
      validator_src_address: from,
      validator_dst_address: to,
      amount,
      publicKey,
      isTyped,
      version: state.getState('backendApiVersion'),
    },
  }
}
