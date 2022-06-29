// functions for replace some requests by isExtension fkag

import { citadelApiRequests } from './citadelApiRequests'
import { externalApiRequests } from './externalApiRequests'
import { localRequestFunctions } from './localRequestFunctions'
import { createApiRequests } from '../createApiRequests'

export const getRequestFunctionsForExtension = (baseURL) => {
  // create axios request functions for citadel api
  const citadelApiFunctions = createApiRequests({
    baseURL,
    withCredentials: true,
    requests: citadelApiRequests,
    enableResponseHandler: true,
  })

  // other servers
  const externalApiFunctions = createApiRequests({
    baseURL: false,
    withCredentials: false,
    requests: externalApiRequests,
    enableResponseHandler: false,
  })

  // all requests are put on the same level. Keep unique request names
  return {
    ...citadelApiFunctions,
    ...externalApiFunctions,
    // export localRequestFunctions as is
    ...localRequestFunctions,
  }
}
