import api from '../../../api'

// by default - proxy request to backend
export const buildLiquidStaking = async function (data) {
  console.log('staking data', data);
  const { data: responseData } = await api.requests.buildLiquidStaking({
    net: this.net,
    address: this.address,
    publicKey: this.publicKey,
    data,
  })

  return responseData
}
