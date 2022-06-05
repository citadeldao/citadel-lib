export const getDelegationFee = ({
  net,
  address,
  transactionType,
  nodeAddress,
  publicKey,
  sourceNodeAddress,
  kt,
  isWithoutDelegation
}) => {
  return {
    url: `transactions/${net}/${address}/fee-info/${transactionType}`,
    method: 'get',
    data: {
      params: {
        publicKey: publicKey,
        validatorAddr: nodeAddress,
        validatorSrcAddr: sourceNodeAddress,
        kt,
        isWithoutDelegation
      },
    },
  }
}
