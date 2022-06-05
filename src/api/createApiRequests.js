import useAxios from './useAxios'

export default ({
  baseURL,
  requests,
  withCredentials,
  enableResponseHandler,
}) => {
  let apiRequests = {}

  Object.keys(requests).map((requestName) => {
    // create axios instace (for each request in this case, but it not required)
    const axiosInstance = useAxios({
      baseURL,
      withCredentials,
      enableResponseHandler,
    })
    // creta axios requests object
    apiRequests[requestName] = (data) => {
      // get request params from functions
      const request = requests[requestName](data)
      // return axios function with request params
      return axiosInstance[request.method](request.url, request.data)
    }
  })

  return apiRequests
}
