import { createApiRequests } from './createApiRequests'
import { requests } from './requests'
import { externalRequests } from './externalRequests'
import { publicRequests } from './publicRequests'
import { formattedRequestsAdapter } from './formattedRequestsAdapter'
import { extensionRequestsAdapter } from './extensionRequestsAdapter'
import { getAuthToken } from './getAuthToken'
import state from '../state'
/************************ API MODULE **********************
 * Exports by default an object with methods for accessing the server (using axios instances)
 * Static request parameters (URL, type) and the name of requests are described in the directories 'publicRequests', 'requests', 'externalRequests'
 *
 * HOW TO USE:
 * // get fee for network
 * const { data } = await api.requests.getFees({net})
 *
 * NOTE: Don't use axios directly inside components to keep code clean
 **********************************************************/

const api = {
  // requests to the authorized api of the citadel
  requests: null,
  // requests to non-citadel api
  externalRequests: null,
  // requests to the public api of the citadel
  // publicRequests: null,
  getAuthToken
}

export default api

export const initApi = () => {
  // get backend URL
  const backendUrl = state.getState('backendUrl')

  // citadel backend
  api.requests = createApiRequests({
    baseURL: backendUrl,
    withCredentials: true,
    requests,
    enableResponseHandler: true,
  })

  // other servers
  api.externalRequests = createApiRequests({
    baseURL: false,
    withCredentials: false,
    requests: externalRequests,
    enableResponseHandler: false,
  })

  // create public api
  const publicBackendUrl = state.getState('publicBackendUrl')
  const publicRequestsList = createApiRequests({
    baseURL: publicBackendUrl,
    withCredentials: true,
    requests: publicRequests,
    enableResponseHandler: true,
  })

  // replace some requests with functions with changes that will go to the backend, and add requests to public routes
  api.requests = {
    ...api.requests,
    ...publicRequestsList,
    ...formattedRequestsAdapter,
  }

  // // create public api
  // const publicBackendUrl = state.getState('publicBackendUrl')
  // const publicRequestsList = createApiRequests({
  //   baseURL: publicBackendUrl,
  //   withCredentials: true,
  //   requests: publicRequests,
  //   enableResponseHandler: true,
  // })

  // api.requests = {
  //   ...api.requests,
  //   ...publicRequestsList,
  // }

  // for the extension,
  if (state.getState('isExtension')) {
    // const publicBackendUrl = state.getState('publicBackendUrl')
    // // create public api
    // api.publicRequests = createApiRequests({
    //   baseURL: publicBackendUrl,
    //   withCredentials: true,
    //   requests: publicRequests,
    //   enableResponseHandler: true,
    // })

    // replace some requests with local mocks and requests without authorization
    api.requests = {
      ...api.requests,
      ...extensionRequestsAdapter,
    }
  }
}

export const resetApi = () => {
  api.requests = null
  api.externalRequests = null
  // api.publicRequests = null
}
