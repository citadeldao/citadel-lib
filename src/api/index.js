import { createApiRequests } from './createApiRequests'
import { requests } from './requests'
import { externalRequests } from './externalRequests'
import { publicRequests } from './publicRequests'
import { formattedRequestsAdapter } from './formattedRequestsAdapter'
import { extensionRequestsAdapter } from './extensionRequestsAdapter'
import state from '../state'

const api = {
  requests: null,
  externalRequests: null,
  publicRequests: null,
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

  // replace some requests with functions with changes that will go to the backend
  api.requests = {
    ...api.requests,
    ...formattedRequestsAdapter,
  }

  // for the extension,
  if (state.getState('isExtension')) {
    const publicBackendUrl = state.getState('publicBackendUrl')
    // create public api
    api.publicRequests = createApiRequests({
      baseURL: publicBackendUrl,
      withCredentials: true,
      requests: publicRequests,
      enableResponseHandler: true,
    })

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
  api.publicRequests = null
}
