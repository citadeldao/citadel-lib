import api from '../../api'
import { checkInitialization, checkTypes } from '../../helpers/checkArguments'

/**
 * Loads the user's rewards for the specified period
 *
 * @param dateFrom STRING, NUMBER (REQUIRED) - beginning of period (ms)
 * @param dateTo STRING, NUMBER (OPTIONAL) - end of period (ms)
 * @returns Returns OBJECT.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getRewardsByRange(1612457885000, 1643993885000)
 *
 * // =>
 * {
 *   "result": "success",
 *   "data": {
 *     "comdex": {
 *       "comdex1eksvfd7400dr6fvkdh4mshfkukm9u8aq2les58": 0.000001
 *     },
 *     "kava": {
 *       "kava16luyu67vmk6jrzwzanemcf9f5hha6ms6a43tg4": 0.112881
 *     },
 *     //...
 *   },
 *   "error": null
 * }
 */

export const getRewardsByRange = async (dateFrom, dateTo) => {
  // checks
  checkInitialization()
  checkTypes(
    ['dateFrom', dateFrom, ['String', 'Number'], true],
    ['dateTo', dateTo, ['String', 'Number']]
  )

  // get data from api
  const { data } = await api.requests.getRewardsByRange({ dateFrom, dateTo })
  return data
}
