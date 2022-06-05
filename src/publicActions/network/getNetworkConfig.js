import networks from '../../networks'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

export default (net) => {
  checkInitialization()
  checkTypes(['net', net, ['String'], true])
  checkNetwork(net)

  return networks.getNetworkClass(net).getNetworkConfig()
}
