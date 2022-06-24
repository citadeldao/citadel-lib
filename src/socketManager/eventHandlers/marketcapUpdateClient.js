import storage from '../../storage'
import { CACHE_NAMES } from '../../constants'

export const marketcapUpdateClient = ({
  net,
  marketCap: { rates, marketCapInfo },
}) => {
  // get old caches
  const ratesCache = storage.caches.getCache(CACHE_NAMES.RATES)
  const marketcapsCache = storage.caches.getCache(CACHE_NAMES.MARKETCAPS)

  // update net caches
  ratesCache[net] = rates
  marketcapsCache[net] = marketCapInfo

  // set updated caches back to storage
  storage.caches.setCache(CACHE_NAMES.RATES, ratesCache)
  storage.caches.setCache(CACHE_NAMES.MARKETCAPS, marketcapsCache)
}
