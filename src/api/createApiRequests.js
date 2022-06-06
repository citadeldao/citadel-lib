import { useAxios } from './useAxios'

export const createApiRequests = ({
  baseURL,
  requests,
  withCredentials,
  enableResponseHandler,
}) => {
  // axios request functions object
  let apiRequests = {}

  Object.keys(requests).map((requestName) => {
    // create axios instace (for each request in this case, but this is not required)
    const axiosInstance = useAxios({
      baseURL,
      withCredentials,
      enableResponseHandler,
    })

    apiRequests[requestName] = (data) => {
      // get request params from function
      const request = requests[requestName](data)
      // return axios function with request params
      return axiosInstance[request.method](request.url, request.data)
    }
  })

  return apiRequests
}
