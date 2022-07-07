import api from '..'
// proxy public request
export const getAllTokenBalances = async (options) => {
  return await api.publicRequests.getAllTokenBalances(options)
}
