import networks from '../../networks'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

export default (net, type) => {
  checkInitialization()
  checkTypes(['net', net, ['String'], true], ['type', type, ['String']])
  checkNetwork(net)

  return networks.getNetworkClass(net).getDerivationPathTemplates(type)
}
