import { checkInitialization } from '../../helpers/checkArguments'
import api from '../../api'

/**
 * Load exchange rates for all networks
 *
 * @returns Returns an object with network rates: { networkKey: ratesObj }
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