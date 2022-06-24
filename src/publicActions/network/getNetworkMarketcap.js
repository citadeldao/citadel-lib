import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetworkOrToken,
  checkInitialization,
} from '../../helpers/checkArguments'
import api from '../../api'
import { isNativeToken } from '../../helpers/isNativeToken'

export const getNetworkMarketcap = async (netOrToken) => {
  // checks
  checkInitialization()
  checkTypes(['netOrToken ', netOrToken, ['String'], true])
  checkNetworkOrToken(netOrToken)

  // TODO: move if to static method

  // for native token call static network method
  if (isNativeToken(netOrToken)) {
    return await networkClasses
      .getNetworkClass(netOrToken)
      .getNetworkMarketcap(netOrToken)
  }

  // for subtoken call api
  const { data } = await api.requests.getMarketcap({ net: netOrToken })
  return data
}
