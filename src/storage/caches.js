import state from '../state'
import { CACHE_NAMES } from '../constants'
import errors from '../errors'

const MULTIUSER_CACHE_NAMES = [
  CACHE_NAMES.SUPPORTED_NETWORK_KEYS,
  CACHE_NAMES.NETWORKS_CONFIG,
  CACHE_NAMES.RATES,
  CACHE_NAMES.MARKETCAPS,
  CACHE_NAMES.STAKE_NODES,
]

const getMultiuserStorageKey = (name) => `lib-cache-${name}`

const getSingleuserStorageKey = (name) =>
  `lib-cache-${state.getState('user').id}-${name}`

const getStorageKey = (name) => {
  // if the cache is the same for all users
  if (MULTIUSER_CACHE_NAMES.includes(name)) {
    return getMultiuserStorageKey(name)
  }
  // if each user has their own cache
  return getSingleuserStorageKey(name)
}

const getCache = (name) => {
  try {
    return JSON.parse(localStorage.getItem(getStorageKey(name)))
  } catch (error) {
    errors.throwError('StorageError', { message: `Caches. ${error.message}` })
  }
}

const setCache = (name, data) => {
  try {
    localStorage.setItem(getStorageKey(name), JSON.stringify(data))
  } catch (error) {
    errors.throwError('StorageError', { message: `Caches. ${error.message}` })
  }
}

const removeCache = (name) => {
  localStorage.removeItem(getStorageKey(name))
}

const clearCache = () => {
  Object.values(CACHE_NAMES).map((cacheName) =>
    localStorage.removeItem(getStorageKey(cacheName))
  )
}

// keep localStorage free space
const clearOutdatedCache = () => {
  // caches that changed the category
  Object.values(CACHE_NAMES).map((cacheName) => {
    // caches that were 'singleuser' and now are not
    if (MULTIUSER_CACHE_NAMES.includes(cacheName)) {
      localStorage.removeItem(getSingleuserStorageKey(cacheName))
    } else {
      // caches that were 'multiuser' and now are not
      localStorage.removeItem(getMultiuserStorageKey(cacheName))
    }
  })

  // delete names that are no longer used
  localStorage.removeItem(getSingleuserStorageKey('stakeList'))
  localStorage.removeItem(getMultiuserStorageKey('stakeNodes'))

  // delete old indexedDB caches
  try {
    indexedDB?.deleteDatabase(`_pouch_wallets_${state.getState('user').id}`)
    indexedDB?.deleteDatabase(`_pouch_caches_${state.getState('user').id}`)
  } catch {
    // skip all errors
    false
  }
}

export const caches = {
  getCache,
  setCache,
  clearCache,
  removeCache,
  clearOutdatedCache,
}
