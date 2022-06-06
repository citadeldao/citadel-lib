import storage from '../../../storage'
import { CACHE_NAMES } from '../../../constants'

export const getNetworkConfig = function () {
  // return net consfig from networks.json
  return storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)[this.net]
}
