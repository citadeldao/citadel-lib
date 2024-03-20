import api from '../../api'

export const getEvmAllowance = async ({ tokenAddress, spenderAddress }) => {
  const { data } = await api.requests.getEvmAllowance({
    tokenAddress,
    spenderAddress,
  })
  return data
}
