import networks from '../../networks'
import {
  checkTypes,
  checkNetworkOrToken,
  checkInitialization,
} from '../../helpers/checkArguments'
import state from '../../state'
import api from '../../api'

export default async (netOrToken) => {
  checkInitialization()
  checkTypes(['netOrToken ', netOrToken, ['String'], true])
  // net might be token
  checkNetworkOrToken(netOrToken)

  // for network:
  if (state.getState('supportedNetworkKeys').includes(netOrToken)) {
    return await networks
      .getNetworkClass(netOrToken)
      .getNetworkMarketcap(netOrToken)
  }

  // for some token
  const { data } = await api.requests.getMarketcap({ net: netOrToken })
  return data
}
