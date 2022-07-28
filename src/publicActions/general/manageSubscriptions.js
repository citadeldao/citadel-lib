import api from '../../api'
import { checkInitialization, checkTypes } from '../../helpers/checkArguments'

/**
 * Manages users subscriptions
 *
 * @param newValue OBJECT (REQUIRED) - new subscriptions statuses { rewardsDigest, newsletter }.
 * @param newValue.rewardsDigest BOOLEAN(OPTIONAL) - email subscription for information about rewards.
 * @param newValue.newsletter BOOLEAN(OPTIONAL) - email subscription for information about news.
 * @returns Returns NULL.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.manageSubscriptions({rewardsDigest: true, newsletter: false})
 *
 * // =>
 * {
 *   result: 'success',
 *   data: null,
 *   error: null,
 * }
 */

export const manageSubscriptions = async (newValue) => {
  // checks
  checkInitialization()
  checkTypes(['newValue', newValue, ['Object'], true])

  const { rewardsDigest, newsletter } = newValue

  checkTypes(
    ['rewardsDigest', rewardsDigest, ['Boolean']],
    ['newsletter', newsletter, ['Boolean']],
  )

  // change subcribe rewards value by api
  const { data } = await api.requests.manageSubscriptions({ rewardsDigest, newsletter })
  return data
}
