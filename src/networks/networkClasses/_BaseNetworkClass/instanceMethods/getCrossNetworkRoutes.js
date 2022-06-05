import networks from '../../..'
import state from '../../../../state'
import { checkNetworkOrToken } from '../../../../helpers/checkArguments'

export default function (token) {
  const tokenConfigRoutes =
    token === this.net
      ? this.methods?.bridge
      : networks.getNetworkClass(this.net).tokens[token].methods?.bridge
  return (
    tokenConfigRoutes
      // filter unsupported routes
      ?.filter((targetToken) => checkNetworkOrToken(targetToken, false))
      // create objct with route info
      .map((targetToken, index) => {
        const isNativeTargetToken = state
          .getState('supportedNetworkKeys')
          .includes(targetToken)
        const targetNet = isNativeTargetToken
          ? targetToken
          : state.getState('supportedTokens')[targetToken]
        return {
          id: index,
          key: targetNet,
          label: networks.getNetworkClass(targetNet).networkName,
        }
      }) || []
  )
}
