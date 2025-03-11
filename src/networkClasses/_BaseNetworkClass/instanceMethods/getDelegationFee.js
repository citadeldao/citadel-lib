import api from '../../../api'

// proxy request to backend
export const getDelegationFee = async function ({
  transactionType,
  nodeAddress,
  sourceNodeAddress = '',
  kt,
  isWithoutDelegation,
  stakeAccount,
  newAddingFormat = false
}) {
  const data = await api.requests.getDelegationFee({
    net: this.net,
    address: this.address,
    stakeAccount,
    transactionType,
    nodeAddress,
    sourceNodeAddress,
    publicKey: this.publicKey,
    kt,
    isWithoutDelegation,
    newAddingFormat
  })
  return data.data
}
