import state from '../state'
import { CACHE_NAMES } from '../constants'
import { debugConsoleLog } from '../helpers/debugConsoleLog'

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
  debugConsoleLog('**getStorageKey name', name)
  debugConsoleLog(
    '**getStorageKey MULTIUSER_CACHE_NAMES.includes',
    MULTIUSER_CACHE_NAMES.includes(name)
  )
  // if the cache is the same for all users
  if (MULTIUSER_CACHE_NAMES.includes(name)) {
    debugConsoleLog(
      '**getStorageKey if .. getMultiuserStorageKey',
      getMultiuserStorageKey(name)
    )
    return getMultiuserStorageKey(name)
  }
  debugConsoleLog(
    '**getStorageKey bofore return getSingleuserStorageKey(name) ',
    getSingleuserStorageKey(name)
  )
  // if each user has their own cache
  return getSingleuserStorageKey(name)
}

const getCache = (name) => JSON.parse(localStorage.getItem(getStorageKey(name)))

const setCache = (name, data) => {
  debugConsoleLog('**setCache name', name)
  debugConsoleLog('**setCache data', data)
  debugConsoleLog('**setCache getStorageKey(name)', getStorageKey(name))
  localStorage.setItem(getStorageKey(name), JSON.stringify(data))
  debugConsoleLog('**setCache after setItem')
}

const removeCache = (name) => {
  localStorage.removeItem(getStorageKey(name))
}

const clearCache = () => {
  Object.values(CACHE_NAMES).map((cacheName) =>
    localStorage.removeItem(getStorageKey(cacheName))
  )
}

// clear outdatedCache: all user keys by MULTIUSER_CACHE_NAMES and invert

const clearOutdatedCache = () => {
  // caches that changed the category
  Object.values(CACHE_NAMES).map((cacheName) => {
    // caches that were 'singleuser' and now are not
    if (MULTIUSER_CACHE_NAMES.includes(cacheName)) {
      localStorage.removeItem(getSingleuserStorageKey(cacheName))
      // caches that were 'multiuser' and now are not
    } else {
      localStorage.removeItem(getMultiuserStorageKey(cacheName))
    }
  })

  // delete names that are no longer used
  localStorage.removeItem(getSingleuserStorageKey('stakeList'))

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
