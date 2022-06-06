import api from '../../api'
import { checkInitialization, checkTypes } from '../../helpers/checkArguments'

/**
 * Loads data to build a chart of rewards
 *
 * @param options OBJECT (OPTIONAL) - { dateFrom, dateTo, listId }
 * @param options.dateFrom STRING, NUMBER (OPTIONAL) - beginning of period (ms)
 * @param options.dateTo STRING, NUMBER (OPTIONAL) - end of period (ms)
 * @param options.listId STRING, NUMBER (OPTIONAL) - custom wallet list id
 * @returns Returns OBJECT.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getGraphRewardsSummary({
 *   dateFrom: '1649355905782',
 *   dateTo: '1649960705782',
 *   listId: '1986',
 * })
 *
 * // =>
 * {
 *   sort: ['native', 'btc', 'usd'],
 *   list: {
 *     '2022-03-17': {
 *       band: [0.000172, 1.5244862756e-8, 0.000626421076],
 *     },
 *     '2022-03-18': {
 *       band: [0.00006, 5.15844438e-9, 0.0002117450094],
 *     },
 *     '2022-03-30': {
 *       icon: [
 *         0.000090415872094196, 1.817907582189335e-9, 0.00008627995082807084,
 *       ],
 *     },
 *   },
 *   first_day: '2022-03-17',
 *   last_day: '2022-03-30',
 * }
 */

export const getGraphRewardsSummary = async (options = {}) => {
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
  const { data } = await api.requests.getGraphRewardsSummary({
    dateFrom,
    dateTo,
    listId,
  })
  return data
}
