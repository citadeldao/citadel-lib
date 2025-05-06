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
  stakeAccount,
  btcAccount,
  newAddingFormat
}) => {
  return {
    // backend domain is in the axios instance
    // url: `transactions/${net}/${address}/fee-info/${transactionType}`,
    url: `/blockchain/${encodeURIComponent(net)}/${address}/fee-info/${transactionType}`,
    method: 'get',
    data: {
      params: {
        publicKey: publicKey,
        validatorAddr: nodeAddress,
        validatorSrcAddr: sourceNodeAddress,
        kt,
        isWithoutDelegation,
        stakeAccount,
        btcAccount,
        version: state.getState('backendApiVersion'),
        newAddingFormat
      },
    },
  }
}
