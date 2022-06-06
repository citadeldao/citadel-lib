import storage from '../../storage'
import { checkInitialization } from '../../helpers/checkArguments'
import { CACHE_NAMES } from '../../constants'

/**
 * Loads an object with network configs.
 *
 * @returns Returns an object with network configs: { networkKey: configObj }.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getAllNetworksConfig()
 *
 * // =>
 * {
 *   result: 'success',
 *   data: {
 *     tez: {
 *       code: 'XTZ',
 *       decimals: '6',
 *       networkName: 'Tezos',
 *       net: 'tez',
 *       validating: '^(tz|KT)([a-zA-Z0-9]{34})$',
 *       defaultPath: "m/44'/1729'/0'/0'",
 *       defaultLedgerPath: "44'/1729'/0'/0'",
 *     },
 *     btc: {
 *       // ...
 *     },
 *     // ...
 *   },
 *   error: null,
 * }
 */

export const getAllNetworksConfig = () => {
  // checks
  checkInitialization()

  // get cache (update on init library)
  return storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)
}
