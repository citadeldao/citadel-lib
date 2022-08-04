import errors from '../errors'
import state from '../state'
import { useAxios } from './useAxios'
import { requests } from './requests'
import { LIB_EVENT_NAMES } from '../constants'
import { dispatchLibEvent } from '../generalFunctions/dispatchLibEvent'

export const getAuthToken = async () => {
  // get backend URL
  const backendUrl = state.getState('backendUrl')
  // get saved tokens
  const accessToken = state.getState('accessToken')
  const refreshToken = state.getState('refreshToken')

  // return if no accessToken
  if (!accessToken) {
    return
  }

  // check refresh token expiration date
  const refreshTokenExpirationDate =
    JSON.parse(Buffer.from(refreshToken.split('.')[1], 'base64').toString())
      ?.exp * 1000

  // throw error if the token has expired
  if (refreshTokenExpirationDate < Date.now()) {
    // send error to client
    dispatchLibEvent(LIB_EVENT_NAMES.TOKEN_REFRESHED, {
      error: {
        message: 'Refresh token has expired. Please, log in again',
        code: 1,
      },
    })
  }

  // get expirationDate from token
  const acccessTokenExpirationDate =
    JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString())
      ?.exp * 1000

  // validate date
  if (acccessTokenExpirationDate > Date.now()) {
    // return currentToken
    return accessToken
  } else {
    // create refresh request
    const axiosInstance = useAxios({
      baseURL: backendUrl,
      withCredentials: true,
      enableResponseHandler: true,
      // accessToken: refreshToken,
    })
    // get request params from function
    const request = requests.refreshAuthToken({ refreshToken })

    // get new tokens
    const { data } = await axiosInstance[request.method](
      request.url,
      request.data
    )

    // set new tokens
    state.setState('accessToken', data.access_token)
    state.setState('refreshToken', data.refresh_token)

    // send new keys to client
    dispatchLibEvent(LIB_EVENT_NAMES.TOKEN_REFRESHED, data)

    return data.access_token
  }
}
