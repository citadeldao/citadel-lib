import networks from '../../networks'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

export default async (net) => {
  checkInitialization()
  checkTypes(['net', net, ['String'], true])
  checkNetwork(net)

  return await networks.getNetworkClass(net).getStakeNodes()
}
