import networks from '../../networks'
import {
  checkTypes,
  checkNetworkOrToken,
  checkInitialization,
} from '../../helpers/checkArguments'
import state from '../../state'
import api from '../../api'

export default async (netOrToken, dateFrom, dateTo) => {
  checkInitialization()
  checkTypes(
    ['netOrToken', netOrToken, ['String'], true],
    ['dateFrom', dateFrom, ['String', 'Number'], true],
    ['dateTo', dateTo, ['String', 'Number']]
  )

  checkNetworkOrToken(netOrToken)

  // for some net
  if (state.getState('supportedNetworkKeys').includes(netOrToken)) {
    return await networks
      .getNetworkClass(netOrToken)
      .getCurrencyHistoryByRange(dateFrom, dateTo)
  }

  // for some token
  const { data } = await api.requests.getCurrencyHistoryByRange({
    net: netOrToken,
    dateFrom,
    dateTo,
  })

  return data
}
