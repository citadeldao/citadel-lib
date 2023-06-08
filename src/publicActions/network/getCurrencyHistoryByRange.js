import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetworkOrToken,
  checkInitialization,
} from '../../helpers/checkArguments'
import api from '../../api'
import { isNativeToken } from '../../helpers/isNativeToken'

/**
 * Getting the token rate for the period.
 *
 * @param net STRING (REQUIRED) - network or token key
 * @param dateFrom STRING, NUMBER (REQUIRED) - beginning of period (ms)
 * @param dateTo STRING, NUMBER (OPTIONAL) - end of period (ms)
 * @returns Returns OBJECT with decoded password
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = citadel.getCurrencyHistoryByRange(
 *   {
 *    net: 'band',
 *    dateFrom: '1643753708000',
 *    dateTo: '1644185708000'
 *  }
 * )
 *
 * // =>
 * {
 *   result: 'success',
 *   data: {
 *     '2022-02-01': '3.49692274',
 *     '2022-02-02': '3.38285639',
 *     '2022-02-03': '3.39263450',
 *     '2022-02-04': '3.84380772',
 *     '2022-02-05': '3.89891240',
 *     '2022-02-06': '3.84992626',
 *   },
 *   error: null,
 * }
 */

export const getCurrencyHistoryByRange = async (options = {}) => {
  // checks
  checkInitialization()
  checkTypes(['options', options, ['Object']])

  const { dateFrom, dateTo, net } = options
  checkTypes(
    ['net', net, ['String'], true],
    ['dateFrom', dateFrom, ['String', 'Number']],
    ['dateTo', dateTo, ['String', 'Number']]
  )

  checkNetworkOrToken(net)

  // TODO: move if to static method

  // for native token call static network method
  if (isNativeToken(net)) {
    return await networkClasses
      .getNetworkClass(net)
      .getCurrencyHistoryByRange(dateFrom, dateTo)
  }

  // for subtoken call api
  const { data } = await api.requests.getCurrencyHistoryByRange({
    net,
    dateFrom,
    dateTo,
  })

  return data
}