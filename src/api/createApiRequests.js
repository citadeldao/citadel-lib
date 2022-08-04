import { useAxios } from './useAxios'

/**
 * CREATE API REQUEST
 *
 * Creates an object with request methods. Each method is a configured axios instance by parameters from requests/ singleRequest object.
 *
 */
export const createApiRequests = ({
  // base axios URL
  baseURL,
  // object with request params functions
  requests,
  withCredentials,
  enableResponseHandler,
  // single request params function
  singleRequest,
  accessToken
}) => {
  // create axios instace (for each request in this case, but this is not required)
  const axiosInstance = useAxios({
    baseURL,
    withCredentials,
    enableResponseHandler,
    accessToken
  })

  // for single request
  if (singleRequest) {
    return (data) => {
      // get request params from function
      const request = singleRequest(data)
      // return axios function with request params
      return axiosInstance[request.method](request.url, request.data)
    }
  }

  // for requests object

  // axios request functions object
  let apiRequests = {}

  Object.keys(requests).map((requestName) => {
    apiRequests[requestName] = (data) => {
      // get request params from function
      const request = requests[requestName](data)
      // return axios function with request params
      return axiosInstance[request.method](request.url, request.data)
    }
  })

  return apiRequests
}
