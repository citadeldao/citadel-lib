import { publicRequests } from './publicRequests'
import { createApiRequests } from '../createApiRequests'
import state from '../../state'
// modify the backend response (will move to the backend in the future)
export const getAllTokenBalances = async (options) => {
  const publicBackendUrl = state.getState('publicBackendUrl')

  // create axios function
  const publicRequest = createApiRequests({
    // remove '/api' substring
    baseURL: publicBackendUrl,
    withCredentials: true,
    singleRequest: publicRequests.getAllTokenBalances,
    enableResponseHandler: true,
  })

  // get original response
  const { data } = await publicRequest(options)

  return { data }
}
