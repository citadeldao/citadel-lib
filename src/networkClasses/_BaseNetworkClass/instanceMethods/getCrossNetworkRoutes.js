import networkClasses from '../../'
import state from '../../../state'
import { checkNetworkOrToken } from '../../../helpers/checkArguments'
import { CACHE_NAMES } from '../../../constants'

export const getCrossNetworkRoutes = function (token) {
  // get routes from network config
  const tokenConfigRoutes =
    token === this.net
      ? // for native token
        this.methods?.bridge
      : // for subtoken
      networkClasses.getNetworkClass(this.net).tokens[token].methods?.bridge
  return (
    tokenConfigRoutes
      // filter unsupported routes
      ?.filter((targetToken) => checkNetworkOrToken(targetToken, false))
      // create objct with route info
      .map((targetToken, index) => {
        // get targetNet
        const isNativeTargetToken = state
          .getState(CACHE_NAMES.SUPPORTED_NETWORK_KEYS)
          .includes(targetToken)
        const targetNet = isNativeTargetToken
          ? targetToken
          : state.getState('supportedTokens')[targetToken]
        return {
          id: index,
          key: targetNet,
          label: networkClasses.getNetworkClass(targetNet).networkName,
        }
      }) || []
  )
}
