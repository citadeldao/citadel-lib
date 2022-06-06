import { checkInitialization } from '../../helpers/checkArguments'
import state from '../../state'
import { CACHE_NAMES } from '../../constants'

/**
 * Returns the keys of the supported networks
 *
 * @returns Returns ARRAY with strings.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getSupportedNetworkKeys()
 *
 * // =>
 * {
 *   "result": "success",
 *   "data": [
 *     "akash",
 *     "band",
 *     "bsc",
 *     "btc",
 *     "cosmos",
 *     //...
 *     "eth",
 *     "icon",
 *     "iost",
 *     "kava",
 *     "secret",
 *     "tez",
 *   ],
 *   "error": null
 * }
 */

export const getSupportedNetworkKeys = () => {
  // checks
  checkInitialization()

  // get data from api
  return state.getState(CACHE_NAMES.SUPPORTED_NETWORK_KEYS).sort()
}
