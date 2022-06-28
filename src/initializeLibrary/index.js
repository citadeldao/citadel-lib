import state from '../state'
import { initApi, default as api } from '../api'
import storage from '../storage'
import walletsManager from '../walletsManager'
import { dispatchLibEvent } from '../dispatchLibEvent'
import { CACHE_NAMES, LIB_EVENT_NAMES } from '../constants'
import { initialCacheManager } from './initialCacheManager'
import { configureModulesByCaches } from './configureModulesByCaches'
import { backgroundUpdates } from './backgroundUpdates'
import socketManager from '../socketManager'

export const initializeLibrary = async ({
  backendUrl,
  socketURL,
  debug,
  stringifyLogs,
  stringifyResponse,
}) => {
  // set socket URL
  state.setState('socketURL', socketURL)

  // set debug mode
  state.setState('debug', debug)

  // set stringify debugConsoleLog
  state.setState('stringifyLogs', stringifyLogs)

  // set stringifyResponse
  state.setState('stringifyResponse', stringifyResponse)

  // create api object
  initApi(backendUrl)

  // load account info
  const { data: info } = await api.formattedApi.getInfo()

  // set user data to state:
  state.setState('user', {
    id: info.id,
    login: info.login,
    subscribe_rewards: info.subscribe_rewards,
  })

  // keep storage free space
  storage.caches.clearOutdatedCache()

  // put marketcaps cache from 'info'
  storage.caches.setCache(CACHE_NAMES.MARKETCAPS, info.marketcap)

  // put rates cache from 'info'
  const ratesCache = {}
  Object.keys(info.currency).map((net) => {
    ratesCache[net] = info.currency[net].rates
  })

  storage.caches.setCache(CACHE_NAMES.RATES, ratesCache)

  // prepare initialCaches
  initialCacheManager.prepareCaches()

  // load caches if they don't exist. Use after state.setState('user'), when localStorage is available
  await initialCacheManager.loadMissingCache()

  // configure modules by cache and walletList from 'info' to fast init
  configureModulesByCaches(initialCacheManager.getInitialCaches())

  // update walletList
  await walletsManager.updateWalletList(info.wallets)

  // connect sockets (do not await for fast load)
  socketManager.init()

  // do not await background updates- 'walletListUpdated' event will be dispatched inside
  backgroundUpdates(initialCacheManager)

  state.setState('isInitialized', true)

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
}
