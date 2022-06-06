import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import api from '../../api'

/**
 * Load balance fund for investors
 *
 * @param bscAddress STRING (REQUIRED) - Binance Smart Chain address
 * @param category STRING (REQUIRED) - 
category, possible values: "community", "foundation", "ecosystem"
 * @returns Returns OBJECT.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getBalanceFund(
 *  '0x30e8a9327160f6582e040236567ec6d3ac075b27',
 *  'community'
 * )
 *
 * // =>
 * {
 *   result: 'success',
 *   data: {
 *     total: 5000000000,
 *     used: 0,
 *     pending: 816776666.6,
 *   },
 *   error: null,
 * }
 */

export const getBalanceFund = async (bscAddress, category) => {
  // checks
  checkInitialization()
  checkTypes(
    ['bscAddress', bscAddress, ['String'], true],
    ['category', category, ['String'], true]
  )

  // get data from api
  const { data } = await api.requests.getBalanceFund({
    category,
    address: bscAddress,
  })

  return data
}
