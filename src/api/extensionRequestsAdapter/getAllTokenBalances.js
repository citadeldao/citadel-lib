import api from '..'
// modify the backend response (will move to the backend in the future)
export const getAllTokenBalances = async (options) => {
  return await api.publicRequests.getAllTokenBalances(options)
}
