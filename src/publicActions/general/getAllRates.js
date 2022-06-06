import storage from '../../storage'
import { checkInitialization } from '../../helpers/checkArguments'
import { CACHE_NAMES } from '../../constants'

/**
 * Load exchange rates for all networks
 *
 * @returns Returns an object with network rates: { networkKey: ratesObj }
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getAllRates()
 *
 * // =>
 * {
 *   result: 'success',
 *   data: {
 *     tez: {
 *       BTC: '0.000087630059',
 *       USD: '4.31067445',
 *       EUR: 0,
 *     },
 *     iost: {
 *       BTC: '0.00000062612431',
 *       USD: '0.030795410',
 *       EUR: 0,
 *     },
 *     // ...
 *   },
 *   error: null,
 * }
 */

export const getAllRates = async () => {
  // checks
  checkInitialization()

  // get cache (update on init library)
  return storage.caches.getCache(CACHE_NAMES.RATES)
}
