import axios from 'axios'
import responseErrorHandler from './responseErrorHandler'
import responseHandler from './responseHandler'

export default ({ baseURL, withCredentials, enableResponseHandler }) => {
  const axiosInstance = axios.create({
    baseURL,
    withCredentials,
  })
  // response handler
  axiosInstance.interceptors.response.use(
    responseHandler,
    enableResponseHandler && responseErrorHandler
  )

  return axiosInstance
}
