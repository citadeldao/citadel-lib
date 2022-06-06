import axios from 'axios'
import { responseErrorHandler } from './responseErrorHandler'
import { responseHandler } from './responseHandler'

export const useAxios = ({
  baseURL,
  withCredentials,
  enableResponseHandler,
}) => {
  // create axios instance
  const axiosInstance = axios.create({
    baseURL,
    withCredentials,
  })
  // add response handler
  axiosInstance.interceptors.response.use(
    responseHandler,
    enableResponseHandler && responseErrorHandler
  )

  return axiosInstance
}
