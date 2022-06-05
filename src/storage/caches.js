import state from '../state'

const getStorageKey = (name) => `lib-cache-${state.getState('user').id}-${name}`

const getCache = (name) => JSON.parse(localStorage.getItem(getStorageKey(name)))

const setCache = (name, data) =>
  localStorage.setItem(getStorageKey(name), JSON.stringify(data))

const clearCache = () =>
  ['supportedNetworkKeys', 'networksConfig', 'rates', 'marketcaps'].map(
    (cacheName) => localStorage.removeItem(getStorageKey(cacheName))
  )

export const caches = { getCache, setCache, clearCache }
