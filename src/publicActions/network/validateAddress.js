import networks from '../../networks'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

export default (net, address) => {
  checkInitialization()
  checkTypes(
    ['net', net, ['String'], true],
    ['address', address, ['String'], true]
  )
  checkNetwork(net)

  return networks.getNetworkClass(net).validateAddress(address)
}
