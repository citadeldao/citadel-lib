import api from '..'

// proxy public request
export const getStakeList = async (options) => {
  return await api.publicRequests.getStakeList(options)
}
