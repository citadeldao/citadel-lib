import api from '..'
// proxy public request
export const sendSignedTransaction = async (options) => {
  return await api.publicRequests.sendSignedTransaction(options)
}
