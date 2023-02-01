import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import api from '../../api'

/**
 * Load balance fund for investors
 *
 * @param options OBJECT (REQUIRED) - options for request ex-{ id, currency='usd', days=1 }
 * @param options.id STRING (REQUIRED) - coingecko id for con ex- 'ethereum'
 * @returns Returns OBJECT.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.coingeckoGetTokenMarketOhlc(
 *  { id: 'ethereum', currency:'usd', days:1 }
 * )
 *
 * // =>
 * {
 *   result: 'success',
 *   data: [
 * [
 *   1675024200000,
 *   23915.31,
 *   23915.31,
 *   23817.19,
 *   23817.19
 * ],
 * [
 *   1675026000000,
 *   23812.89,
 *   23822.07,
 *   23780.64,
 *   23799.31
 *   ].....
 * }
 *   error: null,
 * }
 */

export const coingeckoGetTokenMarketOhlc = async (options) => {
  // checks
  checkInitialization()
  checkTypes(
    ['options', options, ['Object'], true],
  )
  const { id } = options
  checkTypes(
    ['id', id, ['String'], true],
  )

  // get data from api
  const data  = await api.externalRequests.coingeckoGetTokenMarketOhlc({...options, id})

  return data
}