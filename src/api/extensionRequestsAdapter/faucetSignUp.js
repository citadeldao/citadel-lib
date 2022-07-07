import api from '..'

// proxy public request
export const faucetSignUp = async (options) => {
  return await api.publicRequests.faucetSignUp(options)
}
