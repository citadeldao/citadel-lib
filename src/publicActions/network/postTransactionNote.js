import networks from '../../networks'
import {
  checkTypes,
  checkNetworkOrToken,
  checkInitialization,
} from '../../helpers/checkArguments'
import state from '../../state'
import api from '../../api'

export default async (netOrToken, transactionHash, text = '') => {
  checkInitialization()
  checkTypes(
    ['netOrToken', netOrToken, ['String'], true],
    ['transactionHash', transactionHash, ['String'], true],
    ['text', text, ['String']]
  )

  checkNetworkOrToken(netOrToken)

  // for some net
  if (state.getState('supportedNetworkKeys').includes(netOrToken)) {
    return await networks
      .getNetworkClass(netOrToken)
      .postTransactionNote(transactionHash, text)
  }

  // for some token
  const { data } = await api.requests.postTransactionNote({
    net: netOrToken,
    transactionHash,
    text,
  })
  return data
}
