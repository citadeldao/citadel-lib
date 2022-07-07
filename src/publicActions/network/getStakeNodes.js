import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'
import { debugConsoleLog } from '../../helpers/debugConsoleLog'

export const getStakeNodes = async (net) => {
  // checks
  checkInitialization()
  checkTypes(['net', net, ['String'], true])
  checkNetwork(net)

  debugConsoleLog('*getStakeNodes-publicActions, net', net)
  debugConsoleLog(
    '*getStakeNodes-publicActions networkClasses.getNetworkClass(net).getStakeNodes',
    networkClasses.getNetworkClass(net).getStakeNodes
  )
  // call static network method
  return await networkClasses.getNetworkClass(net).getStakeNodes()
}
