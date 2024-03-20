import api from '../../api'

export const getEvmAllowance = async ({ address, net, tokenAddress, spenderAddress }) => {
  const { data } = await api.requests.getEvmAllowance({
    address,
    net,
    tokenAddress,
    spenderAddress,
  })
  return data
}
