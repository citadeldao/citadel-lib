import networks from '../../networks'
import {
  checkTypes,
  checkNetworkOrToken,
  checkInitialization,
} from '../../helpers/checkArguments'
import state from '../../state'

export default (netOrToken, encodedPrivateKey, password) => {
  checkInitialization()

  checkTypes(
    ['netOrToken', netOrToken, ['String'], true],
    ['encodedPrivateKey', encodedPrivateKey, ['String'], true],
    ['password', password, ['String'], true]
  )

  checkNetworkOrToken(netOrToken)

  let net = netOrToken

  if (!state.getState('supportedNetworkKeys').includes(netOrToken)) {
    net = state.getState('supportedTokens')[netOrToken]
  }

  return networks
    .getNetworkClass(net)
    .decodePrivateKeyByPassword(encodedPrivateKey, password)
}
