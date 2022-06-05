import networks from '../../networks'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

export default (net, type, index) => {
  checkInitialization()
  checkTypes(
    ['net', net, ['String'], true],
    ['type', type, ['String']],
    ['index', index, ['String', 'Number']]
  )
  checkNetwork(net)

  return networks.getNetworkClass(net).getDerivationPathByIndex(type, index)
}
