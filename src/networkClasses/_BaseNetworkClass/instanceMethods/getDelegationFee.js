import api from '../../../api'

// proxy request to backend
export const getDelegationFee = async function ({
  transactionType,
  nodeAddress,
  sourceNodeAddress = '',
  kt,
  isWithoutDelegation
}) {
  const data = await api.requests.getDelegationFee({
    net: this.net,
    address: this.address,
    transactionType,
    nodeAddress,
    sourceNodeAddress,
    publicKey: this.publicKey,
    kt,
    isWithoutDelegation
  })
  return data.data
}
