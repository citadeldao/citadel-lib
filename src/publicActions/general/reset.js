import { resetLibrary } from '../../resetLibrary'
import { checkTypes } from '../../helpers/checkArguments'

/**
 * Reset library state
 *
 * @param clearCache BOOLEAN (OPTIONAL) - 'false' by default. If 'true' the cache is deleted (walletList, for example)
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

export const reset = (clearCache) => {
  // checks
  checkTypes(['clearCache', clearCache, ['Boolean']])

  // reset lib states
  resetLibrary(clearCache)
}
