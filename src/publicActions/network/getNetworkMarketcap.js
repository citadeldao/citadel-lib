import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetworkOrToken,
  checkInitialization,
} from '../../helpers/checkArguments'
import api from '../../api'
import { isNativeToken } from '../../helpers/isNativeToken'

/**
 * Returns marketcap info for net or token
 *
 * @param netOrToken STRING (REQUIRED) - network / token key
 * 
 * @returns Returns OBJECT with marketcap info
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getNetworkMarketcap('btc')
 *
 * // =>
  {
    result: 'success',
    data: {
      yield: '',
      priceBtc: 1,
      priceUsd: '41994.49494793',
      inflation: '',
      marketCap: '790689904578',
      stakingRate: '',
      priceBtcDelta24: 1,
      priceUsdDelta24: '-1937.29752763',
      unbondingPeriod: 'instant',
      volumeDelta24Btc: '',
      volumeDelta24Usd: '39234214494.62',
      circulatingSupply: '18828418',
      priceBtcDelta24pct: '',
      priceUsdDelta24pct: -4.41,
    },
    error: null,
  }
 */

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
