import { resetLibrary } from '../../generalFunctions/resetLibrary'
import { checkTypes } from '../../helpers/checkArguments'

/**
 * Reset library state
 *
 * @param clearCache BOOLEAN (OPTIONAL) - 'false' by default. If 'true' the cache is deleted (walletList, for example)
 * @param userId STRING, NUMBER (OPTIONAL) - used to delete the user's cache without initializing the library by user id
 * @returns Returns NULL.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.reset()
 *
 * // =>
 * {
 *   result: "success",
 *   data: null,
 *   error: null
 * }
 */

export const reset = (clearCache, userId) => {
  // checks
  checkTypes(
    ['clearCache', clearCache, ['Boolean']],
    ['userId', userId, ['String', 'Number']]
  )

  // reset lib states
  resetLibrary(clearCache, userId)
}
