import api from '../../../api'

// by default - proxy request to backend
export const buildLiquidStaking = async function (data) {
  const { data: responseData } = await api.requests.buildLiquidStaking({
    net: this.net,
    address: this.address,
    publicKey: this.publicKey,
    contractAddress: data.contractAddress,
    amount: data.amount,
    action: data.action,
    nftId: data.nftId,
  })

  return responseData
}
