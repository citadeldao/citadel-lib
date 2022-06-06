import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import api from '../../api'

/**
 * Loads investor balances
 *
 * @param bscAddress STRING (REQUIRED) - Binance Smart Chain address
 * @param category STRING (REQUIRED) - category, possible values: "advisors", "private1", "private2", "team"
 * @returns Returns OBJECT.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getPrivateSale(
 *   '0x4dd28bee5135fc5dbb358a68ba941a5bf8e7aab2',
 *   'advisors'
 * )
 *
 * // =>
 * {
 *   result: 'success',
 *   data: {
 *     total: 0,
 *     used: 0,
 *     pending: 0,
 *   },
 *   error: null,
 * }
 */

export const getPrivateSale = async (bscAddress, category) => {
  // checks
  checkInitialization()
  checkTypes(
    ['bscAddress', bscAddress, ['String'], true],
    ['category', category, ['String']]
  )

  // get data from api
  const { data } = await api.requests.getPrivateSale({
    category,
    address: bscAddress,
  })

  return data
}
