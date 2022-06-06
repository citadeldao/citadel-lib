import storage from '../../storage'
import { checkInitialization } from '../../helpers/checkArguments'
import { CACHE_NAMES } from '../../constants'

/**
 * Loads rates for all networks
 *
 * @returns Returns an object with network marketcaps: { networkKey: marketcapsObj }.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getAllMarketcaps()
 *
 * // =>
 * {
 * result: 'success',
 * data: {
 *   tez: {
 *     yield: 5.93,
 *     priceBtc: '0.000087630059',
 *     priceUsd: '4.31067445',
 *     inflation: 4.5818700417194655,
 *     marketCap: '3753057781',
 *     stakingRate: 75.28,
 *     priceBtcDelta24: '0.00000052642475',
 *     priceUsdDelta24: '0.073185639',
 *     unbondingPeriod: 'instant',
 *     volumeDelta24Btc: '3697.74',
 *     volumeDelta24Usd: '181654270.44',
 *     circulatingSupply: '870642825',
 *     priceBtcDelta24pct: 0.6,
 *     priceUsdDelta24pct: 1.73,
 *   },
 *   iost: {
 *     // ...
 *   },
 *   // ...
 * },
 * error: null,
 * }
 */

export const getAllMarketcaps = () => {
  // checks
  checkInitialization()

  // get cache (update on init library)
  return storage.caches.getCache(CACHE_NAMES.MARKETCAPS)
}
