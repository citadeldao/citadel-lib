import api from '../../api'
import { checkInitialization, checkTypes } from '../../helpers/checkArguments'

/**
 * Loads a user's balance history
 *
 * @param options OBJECT (OPTIONAL) - { dateFrom, dateTo, listId }
 * @param options.dateFrom STRING, NUMBER (OPTIONAL) - beginning of period (ms)
 * @param options.dateTo STRING, NUMBER (OPTIONAL) - end of period (ms)
 * @param options.listId STRING, NUMBER (OPTIONAL) - custom wallet list id
 * @returns Returns OBJECT.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getBalanceHistory({
 *   dateFrom: '1649355905782',
 *   dateTo: '1649960705782',
 *   listId: '1986',
 * })
 *
 * // =>
 * {
 *   result: 'success',
 *   data: {
 *     list: {},
 *     first_day: null,
 *     last_day: null,
 *   },
 *   error: null,
 * }
 */

export const getBalanceHistory = async (options = {}) => {
  // checks
  checkInitialization()
  checkTypes(['options', options, ['Object']])

  const { dateFrom, dateTo, listId } = options

  checkTypes(
    ['dateFrom', dateFrom, ['String', 'Number']],
    ['dateTo', dateTo, ['String', 'Number']],
    ['listId', listId, ['String', 'Number']]
  )

  // get data from api
  const { data } = await api.requests.getBalanceHistory({
    dateFrom,
    dateTo,
    listId,
  })
  return data
}
