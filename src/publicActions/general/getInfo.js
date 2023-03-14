import { checkInitialization } from '../../helpers/checkArguments'
import api from '../../api'

/**
 * get user sccount info
 *
 * @returns Returns current user account info
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getInfo()
 *
 * // =>
 * {
 *   result: 'success',
 *   data: { <info> }
 *   error: null,
 * }
 */

export const getInfo = async () => {
  // checks
  checkInitialization()

  //call api method
  const { data } = await api.requests.getInfo()
  
  return data
}