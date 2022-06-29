import { createApiRequests } from './createApiRequests'
import { requests } from './requests'
import { externalRequests } from './externalRequests'
import { formattedApi } from './formattedApi'
import { getRequestFunctionsForExtension } from './requestFunctionsForExtension'
import state from '../state'

const api = {
  requests: null,
  externalRequests: null,
  formattedApi,
}

export default api

export const initApi = (baseURL) => {
  // citadel backend
  api.requests = createApiRequests({
    baseURL,
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

  // for the extension, replace some requests with local mocks and requests without authorization
  if (state.getState('isExtension')) {
    api.requests = {
      ...api.requests,
      ...getRequestFunctionsForExtension(baseURL),
    }
  }
}

export const resetApi = () => {
  api.requests = null
  api.externalRequests = null
}
