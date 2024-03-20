import api from '../../api'

export const getEvmApprove = async ({ address, net, tokenAddress, spenderAddress, amount }) => {
  const { data } = await api.requests.getEvmApprove({
    address,
    net,
    tokenAddress,
    spenderAddress,
    amount,
  })
  return data
}
