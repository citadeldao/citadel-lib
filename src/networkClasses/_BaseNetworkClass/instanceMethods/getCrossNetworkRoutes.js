import networkClasses from '../../'
import { checkNetworkOrToken } from '../../../helpers/checkArguments'
import netwrokClasses from '../../'

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
        const targetNet = netwrokClasses.getNativeNet(targetToken)
        return {
          id: index,
          key: targetNet,
          label: networkClasses.getNetworkClass(targetNet).networkName,
        }
      }) || []
  )
}
