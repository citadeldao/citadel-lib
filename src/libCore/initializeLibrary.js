import state from '../state'
import api from '../api'
import { initApi } from '../api'
import formattedApi from './formattedApi'
import networks from '../networks'
import storage from '../storage'
import updateWalletList from './updateWalletList'
import walletInstances from '../walletInstances'

export default async ({
  backendUrl,
  debug,
  stringifyLogs,
  stringifyResponse,
}) => {
  // set default state
  state.setDefaultState()

  // set debug mode
  state.setState('debug', debug)

  // set stringify debugConsoleLog
  state.setState('stringifyLogs', stringifyLogs)

  // set stringifyResponse
  state.setState('stringifyResponse', stringifyResponse)

  // create api object
  initApi(backendUrl)

  // initial requests
  let daoSupportedNetworks
  let networksConfig
  let info

  const requestFunctions = [
    // TODO: add subtokens request and save it to cache for fast init
    // dao supported networks
    async () => {
      // catch error for success init
      try {
        const { data } = await api.requests.getDaoSupportedNetworks()
        daoSupportedNetworks = data
      } catch (e) {
        daoSupportedNetworks = []
        console.error(e)
      }
    },
    // networks config
    async () => {
      networksConfig = await formattedApi.getNetworksConfig()
    },
    // get info
    async () => {
      const { data } = await formattedApi.getInfo()
      info = data
    },
  ]

  await Promise.all(
    requestFunctions.map(async (requestFunction) => await requestFunction())
  )

  // set user data:
  state.setState('user', {
    id: info.id,
    login: info.login,
    subscribe_rewards: info.subscribe_rewards,
  })

  // set static network properties from config
  networks.configureNetworkClasses(networksConfig)

  // set supported network keys to state
  state.setState(
    'supportedNetworkKeys',
    networks.getSupportedNetworks(networksConfig)
  )

  // set dao supported networks
  state.setState(
    'daoSupportedNetworks',
    daoSupportedNetworks.filter((net) => networks.getNetworkClass(net))
  )

  // create supported tokens object
  const supportedTokens = {}

  state.getState('supportedNetworkKeys').map((net) => {
    Object.keys(networksConfig[net].tokens || {}).map((token) => {
      supportedTokens[token] = net
    })
  })

  // set supported tokens to state
  state.setState('supportedTokens', supportedTokens)

  // put networksConfig cache
  const networksConfigCache = {}

  state.getState('supportedNetworkKeys').map((net) => {
    networksConfigCache[net] = networksConfig[net]
  })

  storage.caches.setCache('networksConfig', networksConfigCache)

  // update wallets and create wallet instances
  updateWalletList(info.wallets)

  // put marketcaps cache
  const marketcapsCache = {}
  state.getState('supportedNetworkKeys').map((net) => {
    marketcapsCache[net] = info.marketcap[net]
  })
  storage.caches.setCache('marketcaps', marketcapsCache)

  // put rates cache
  const ratesCache = {}
  state.getState('supportedNetworkKeys').map((net) => {
    ratesCache[net] = info.currency[net]?.rates
  })
  storage.caches.setCache('rates', ratesCache)

  // get storage wallet list
  const walletList = storage.wallets.getWalletList()

  await Promise.all(
    walletList.map(async (walletInfo) => {
      // create wallet instances
      walletInstances.updateWalletInstance(walletInfo)
      // update all subtokensList
      await walletInstances
        .getWalletInstanceById(walletInfo.id)
        .updateSubtokensList()
    })
  )

  state.setState('isInitialized', true)
}
