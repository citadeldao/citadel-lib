import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import api from '../../api'

/**
 * Load balance fund for investors
 *
 * @param options OBJECT (REQUIRED) - options for request ex-{ currency='usd', perPage=10, page=1 }
 * @returns Returns OBJECT.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.coingeckoGetTokensInfo(
 *  { currency:'usd', perPage:10, page:1, category: 'filter by coin category' }
 * )
 *
 * // =>
 * {
 *   result: 'success',
 *   data: [{"id":"bitcoin","symbol":"btc","name":"Bitcoin","image":"https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579","current_price":16802.28,"market_cap":323531247691,"market_cap_rank":1,"fully_diluted_valuation":353151749806,"total_volume":22562103122,"high_24h":16874.12,"low_24h":16382.07,"price_change_24h":77.72,"price_change_percentage_24h":0.46474,"market_cap_change_24h":1378976859,"market_cap_change_percentage_24h":0.42805,"circulating_supply":19238631.0,"total_supply":21000000.0,"max_supply":21000000.0,"ath":69045,"ath_change_percentage":-75.66369,"ath_date":"2021-11-10T14:24:11.849Z","atl":67.81,"atl_change_percentage":24679.82606,"atl_date":"2013-07-06T00:00:00.000Z","roi":null,"last_updated":"2022-12-20T07:40:07.537Z","price_change_percentage_14d_in_currency":-1.0080004095991555,"price_change_percentage_1h_in_currency":0.07016054549381154,"price_change_percentage_24h_in_currency":0.4647353192710786,"price_change_percentage_30d_in_currency":0.5358274153598435,"price_change_percentage_7d_in_currency":-2.1962980090769664},.....],
 *   error: null,
 * }
 */

export const coingeckoGetTokensInfo = async (options) => {
  // checks
  checkInitialization()
  checkTypes(
    ['options', options, ['Object'], true],
  )

  // get data from api
  const data = await api.externalRequests.coingeckoGetTokensInfo(options)

  return data
}