import axios from 'axios'
import { responseErrorHandler } from './responseErrorHandler'
import { responseHandler } from './responseHandler'

/**
 * USE AXIOS
 *
 * Returns an axios instance with interceptors, base url and credentials (optional)
 */
export const useAxios = ({
  baseURL,
  withCredentials,
  enableResponseHandler,
  accessToken,
}) => {
  // create axios instance
  const axiosInstance = axios.create({
    baseURL,
    withCredentials,
    // add header with accesToken if it exist
    ...(accessToken && {
      headers: { common: { Authorization: `Bearer ${accessToken}` } },
    }),
  })

  // add response handler
  axiosInstance.interceptors.response.use(
    responseHandler,
    enableResponseHandler && responseErrorHandler
  )

  return axiosInstance
}
