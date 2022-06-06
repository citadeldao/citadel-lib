import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

export const getStakeNodes = async (net) => {
  // checks
  checkInitialization()
  checkTypes(['net', net, ['String'], true])
  checkNetwork(net)

  // call static network method
  return await networkClasses.getNetworkClass(net).getStakeNodes()
}
