import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetworkOrToken,
  checkInitialization,
} from '../../helpers/checkArguments'
import state from '../../state'
import api from '../../api'
import { CACHE_NAMES } from '../../constants'

export const getNetworkMarketcap = async (netOrToken) => {
  // checks
  checkInitialization()
  checkTypes(['netOrToken ', netOrToken, ['String'], true])
  checkNetworkOrToken(netOrToken)

  // TODO: move if to static method

  // for native token call static network method
  if (state.getState(CACHE_NAMES.SUPPORTED_NETWORK_KEYS).includes(netOrToken)) {
    return await networkClasses
      .getNetworkClass(netOrToken)
      .getNetworkMarketcap(netOrToken)
  }

  // for subtoken call api
  const { data } = await api.requests.getMarketcap({ net: netOrToken })
  return data
}
