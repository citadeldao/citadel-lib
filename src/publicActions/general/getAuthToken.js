import { checkInitialization } from '../../helpers/checkArguments'
import api from '../../api'

/**
 * Get auth token
 *
 * @returns Returns and updates access token
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getAuthToken()
 *
 * // =>
 * {
 *   result: 'success',
 *   data: accessToken
 *   error: null,
 * }
 */

export const getAuthToken = async () => {
  // checks
  checkInitialization()

  // call getAuthToken(check and updates access token)
  return api.getAuthToken()
}