import networkClasses from '../../'
//import { checkNetworkOrToken } from '../../../helpers/checkArguments'
// import netwrokClasses from '../../'

export const getCrossNetworkRoutes = function (token) {
  //to do grish this ic stanum es subtokeni bridger@ u xrgum
  // get routes from network config
  const tokenConfigRoutes =
    token === this.net
      ? // for native token
        this.methods?.bridge
      : // for subtoken
        // networkClasses.getNetworkClass(this.net).tokens[token].methods?.bridge
        this.subtokensList.find(item => item.net === token).methods?.bridge
  return (
    tokenConfigRoutes
      // filter unsupported routes
      //?.filter((targetToken) => checkNetworkOrToken(targetToken, false))
      // create objct with route info
      .map((targetToken, index) => {
        // get targetNet
        // const targetNet = netwrokClasses.getNativeNet(targetToken)
        return {
          id: index,
          key: targetToken,//targetNet,
          label: networkClasses.getNetworkClass(targetToken/* targetNet */).networkName,
        }
      }) || []
  )
}
