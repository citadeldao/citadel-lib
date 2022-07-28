import api from '../../api'
import { checkInitialization } from '../../helpers/checkArguments'

/**
 * Return list of users subscriptions
 *
 * @returns Returns an object with users subscriptions
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getSubscriptions()
 *
 * // =>
 * {
 *   result: 'success',
 *   data: {
 *	   	rewardsDigest: true
 *	   	newsletter: false
 *	},
 *   error: null,
 * }
 */

export const getSubscriptions = async () => {
  // checks list of users subscriptions
  checkInitialization()

  // get
  const { data } = await api.requests.getSubscriptions()
  return data
}
