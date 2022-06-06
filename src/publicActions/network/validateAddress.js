import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

export const validateAddress = (net, address) => {
  // checks
  checkInitialization()
  checkTypes(
    ['net', net, ['String'], true],
    ['address', address, ['String'], true]
  )
  checkNetwork(net)

  // call static network method
  return networkClasses.getNetworkClass(net).validateAddress(address)
}
