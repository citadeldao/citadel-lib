import api from '..'
// modify the backend response (will move to the backend in the future)
export const prepareClaim = async (options) => {
  return await api.publicRequests.prepareClaim(options)
}
