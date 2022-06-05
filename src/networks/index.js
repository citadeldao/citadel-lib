import networkClasses from './networkClasses'
import state from '../state'

export default {
  configureNetworkClasses(networkConfigs) {
    Object.entries(networkConfigs).map(([net, networkConfig]) => {
      // name --> networkName, conflict resolution between class name and config name from backend
      const { name: networkName, ...formattedCongig } = networkConfig
      networkClasses[net]?._configure({ ...formattedCongig, networkName })
    })
  },
  unconfigureNetworkClasses() {
    Object.values(networkClasses).map((networkClass) => {
      networkClass._unconfigure()
    })
  },
  getNetworkClass(net) {
    return networkClasses[net]
  },
  getNativeNet(netOrToken) {
    const isNativeToken = state
      .getState('supportedNetworkKeys')
      .includes(netOrToken)
    if (isNativeToken) {
      return netOrToken
    }
    return state.getState('supportedTokens')[netOrToken]
  },
  createWalletInstance(walletInfo) {
    return new networkClasses[walletInfo.net](walletInfo)
  },
  getSupportedNetworks(networkConfigs) {
    return Object.keys(networkConfigs).filter((net) => networkClasses[net])
  },
}
