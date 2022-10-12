import state from '../../../state'
// function returns request parameters for the axios instance.
export const getDelegationFee = ({
  net,
  address,
  transactionType,
  nodeAddress,
  publicKey,
  sourceNodeAddress,
  kt,
  isWithoutDelegation,
}) => {
  return {
    // backend domain is in the axios instance
    url: `transactions/${net}/${address}/fee-info/${transactionType}`,
    method: 'get',
    data: {
      params: {
        publicKey: publicKey,
        validatorAddr: nodeAddress,
        validatorSrcAddr: sourceNodeAddress,
        kt,
        isWithoutDelegation,
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
