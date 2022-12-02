import api from '..'

// proxy public request
export const checkTransaction = async (options) => {
  return await api.publicRequests.checkTransaction(options)
}
