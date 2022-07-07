import api from '..'

// proxy public request
export const prepareTransfer = async (options) => {
  return await api.publicRequests.prepareTransfer(options)
}
