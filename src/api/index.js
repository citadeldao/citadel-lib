import { createApiRequests } from './createApiRequests'
import { requests } from './requests'
import { externalRequests } from './externalRequests'
import { formattedApi } from './formattedApi'

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
}

export const resetApi = () => {
  api.requests = null
  api.externalRequests = null
}
