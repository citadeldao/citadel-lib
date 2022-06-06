import { networkClasses } from './networkClasses'
import state from '../state'
import { CACHE_NAMES } from '../constants'

// set static class fields from config
const configure = (networkConfigs) => {
  Object.entries(networkConfigs).map(([net, networkConfig]) => {
    // name --> networkName, conflict resolution between class name and config name from backend
    const { name: networkName, ...formattedCongig } = networkConfig
    networkClasses[net]?._configure({ ...formattedCongig, networkName })
  })
}

// set static class fields to null
const unconfigure = () => {
  Object.values(networkClasses).map((networkClass) => {
    networkClass._unconfigure()
  })
}

const getNetworkClass = (net) => {
  return networkClasses[net]
}

// get native net by token
const getNativeNet = (netOrToken) => {
  const isNativeToken = state
    .getState(CACHE_NAMES.SUPPORTED_NETWORK_KEYS)
    .includes(netOrToken)
  if (isNativeToken) {
    return netOrToken
  }
  return state.getState('supportedTokens')[netOrToken]
}

const createWalletInstance = (walletInfo) => {
  return new networkClasses[walletInfo.net](walletInfo)
}

// get network keys which are in the config and for which there is a class
const getSupportedNetworks = (networkConfigs) => {
  return Object.keys(networkConfigs).filter((net) => networkClasses[net])
}

export default {
  configure,
  unconfigure,
  getNetworkClass,
  getNativeNet,
  createWalletInstance,
  getSupportedNetworks,
}
