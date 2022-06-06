import api from '../../api'
import { checkInitialization, checkTypes } from '../../helpers/checkArguments'

/**
 * Manages email subscription for information about rewards
 *
 * @param newValue BOOLEAN (REQUIRED) - new ubscription status. If 'true' - on, if 'false' - off
 * @returns Returns NULL.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.subscribeRewards(false)
 *
 * // =>
 * {
 *   result: 'success',
 *   data: null,
 *   error: null,
 * }
 */

export const subscribeRewards = async (newValue) => {
  // checks
  checkInitialization()
  checkTypes(['newValue', newValue, ['Boolean']])

  // change subcribe rewards value by api
  const { data } = await api.requests.subscribeRewards({ newValue })
  return data
}
