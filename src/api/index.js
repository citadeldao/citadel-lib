import { createApiRequests } from './createApiRequests'
import { requests } from './requests'
import { externalRequests } from './externalRequests'
import { formattedRequestFunctions } from './formattedRequestFunctions'
import { requestFunctionsForExtension } from './requestFunctionsForExtension'
import state from '../state'

const api = {
  requests: null,
  externalRequests: null,
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
    ...formattedRequestFunctions,
  }

  // for the extension, replace some requests with local mocks and requests without authorization
  if (state.getState('isExtension')) {
    api.requests = {
      ...api.requests,
      ...requestFunctionsForExtension,
    }
  }
}

export const resetApi = () => {
  api.requests = null
  api.externalRequests = null
}
