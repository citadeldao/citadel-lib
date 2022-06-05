import createApiRequests from './createApiRequests'
import { requests } from './requests'
import { externalRequests } from './externalRequests'

const api = {
  requests: null,
  externalRequests: null,
}

export default api

export const initApi = (baseURL) => {
  api.requests = createApiRequests({
    baseURL,
    withCredentials: true,
    requests,
    enableResponseHandler: true,
  })

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
