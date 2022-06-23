import state from '../state'
import { CACHE_NAMES } from '../constants'
import networkClasses from '../networkClasses'

export const configureModulesByCaches = ({
  networksConfig,
  daoSupportedNetworks,
}) => {
  // set static network properties from config
  networkClasses.configure(networksConfig)

  // get supportedNetworkKeys
  const supportedNetworkKeys =
    networkClasses.getSupportedNetworks(networksConfig)

  // set supported network keys to state
  state.setState(CACHE_NAMES.SUPPORTED_NETWORK_KEYS, supportedNetworkKeys)

  // set dao supported networks
  state.setState(
    'daoSupportedNetworks',
    daoSupportedNetworks.filter((net) => supportedNetworkKeys.includes(net))
  )

  // create supported tokens object
  const supportedTokens = {}

  supportedNetworkKeys.map((net) => {
    Object.keys(networksConfig[net].tokens || {}).map((token) => {
      supportedTokens[token] = net
    })
  })

  // set supported tokens to state
  state.setState('supportedTokens', supportedTokens)
}
