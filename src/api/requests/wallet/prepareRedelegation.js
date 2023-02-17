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
    //url: `transactions/${net}/${address}/prepare-redelegation?version=${state.getState('backendApiVersion')}`,
    url: `/blockchain/${net}/${address}/builder/redelegation?version=${state.getState('backendApiVersion')}`,
    method: 'post',
    data: {
      validator_src_address: from,
      validator_dst_address: to,
      amount,
      publicKey,
      isTyped,
    },
  }
}
