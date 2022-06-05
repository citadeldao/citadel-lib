import networks from '../../networks'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

export default (net, privateKey) => {
  checkInitialization()
  checkTypes(
    ['net', net, ['String'], true],
    ['privateKey', privateKey, ['String'], true]
  )
  checkNetwork(net)

  return networks.getNetworkClass(net).getAccountsByPrivateKey(privateKey)
}
