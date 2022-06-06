import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

export const getNetworkConfig = (net) => {
  // checks
  checkInitialization()
  checkTypes(['net', net, ['String'], true])
  checkNetwork(net)

  // call static network method
  return networkClasses.getNetworkClass(net).getNetworkConfig()
}
