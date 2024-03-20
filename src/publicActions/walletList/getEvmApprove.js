import api from '../../api'

export const getEvmApprove = async ({ tokenAddress, spenderAddress, amount }) => {
  const { data } = await api.requests.getEvmApprove({
    tokenAddress,
    spenderAddress,
    amount,
  })
  return data
}
