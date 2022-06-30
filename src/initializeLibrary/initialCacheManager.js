import storage from '../storage'
import { CACHE_NAMES } from '../constants'
import api from '../api'

// for loading missing caches, fast initialization with cached data and updating old caches after initialization
// NOTE: do not use before 'info' request (storage keys not available)

export const initialCacheManager = {
  // NETWORKS CONFIG
  [CACHE_NAMES.NETWORKS_CONFIG]: {
    // get cache
    cache: null,
    // cache existence before init
    wasCached: null,
    // loading function
    async updateCache() {
      this.cache = await api.requests.getNetworksConfig()
      // put cache to storage
      storage.caches.setCache(CACHE_NAMES.NETWORKS_CONFIG, this.cache)
    },
  },

  // DAO SUPPORTED NETWORKS
  [CACHE_NAMES.DAO_SUPPORTED_NETWORKS]: {
    // get cache
    cache: null,
    // cache existence before init
    wasCached: null,
    async updateCache() {
      const { data } = await api.requests.getDaoSupportedNetworks()
      this.cache = data
      // put cache to storage
      storage.caches.setCache(CACHE_NAMES.DAO_SUPPORTED_NETWORKS, this.cache)
    },
  },

  prepareCaches() {
    Object.values(CACHE_NAMES).map((cacheName) => {
      // return if cache was not registered in initialCacheManager
      if (!this[cacheName]) {
        return
      }
      // set cache from storage
      this[cacheName].cache = storage.caches.getCache(cacheName)
      // set wasCached flag
      this[cacheName].wasCached = !!this[cacheName].cache
    })
  },

  // get initial caches object
  getInitialCaches() {
    const initialCaches = {}
    Object.values(CACHE_NAMES).map((cacheName) => {
      // return if cache was not registered in initialCacheManager
      if (!this[cacheName]) {
        return
      }
      initialCaches[cacheName] = this[cacheName].cache
    })
    return initialCaches
  },

  // load missing caches
  async loadMissingCache() {
    await Promise.all(
      Object.values(CACHE_NAMES).map(async (cacheName) => {
        // return if cache was not registered in initialCacheManager
        if (!this[cacheName]) {
          return
        }
        if (!this[cacheName].wasCached) {
          await this[cacheName].updateCache()
        }
      })
    )
  },

  // update old caches
  async updateOldCache() {
    await Promise.all(
      Object.keys(this).map(async (dataName) => {
        if (this[dataName].wasCached) {
          await this[dataName].updateCache()
        }
      })
    )
  },
}
