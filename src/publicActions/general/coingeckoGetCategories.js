import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import api from '../../api'

/**
 * Load balance fund for investors
 *
 * @param options OBJECT (REQUIRED) - options for request ex-{ order: 'market_cap_desc' }
 * @returns Returns OBJECT.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.coingeckoGetCategories(
 *  { 'order': sort order (market_cap_desc (default)) }
 * )
 *
 * // =>
 * {
 *   result: 'success',
 *   data: [{{
    "id": "ethereum-ecosystem",
    "name": "Ethereum Ecosystem",
    "market_cap": 490877172639.0883,
    "market_cap_change_24h": -5.52483115970234,
    "content": "",
    "top_3_coins": [
      "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
      "https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663",
      "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850"
    ],
    "volume_24h": 111746757363.61256,
    "updated_at": "2023-02-10T18:00:27.592Z"
  },.....],
 *   error: null,
 * }
 */

export const coingeckoGetCategories = async (options= {}) => {
  // checks
  checkInitialization()
  checkTypes(
    ['options', options, ['Object'], true],
  )

  let data 
  try{
    // get data from free api
    data = await api.externalRequests.coingeckoGetCategories(options)
  }catch(e){
    // get data from proxy api
    const url = e.config.url
    const route = url.substring(url.indexOf('/coins'));
    const res = await api.proxyRequests.executeCoingecko(route)
    data = res.data
  }

  return data
}