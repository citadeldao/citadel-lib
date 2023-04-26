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
 * const response = await citadel.coingeckoGetTokenMarketChart(
 *  { id: 'ethereum', currency:'usd', days:1 }
 * )
 *
 * // =>
 * {
 *   result: 'success',
 *   data: {"prices":[[1670320908925,1257.3765697000376],[1670324515641,1254.0961278176105],[1670328121518,1256.2539705653146],[1670331732081,1259.323487055416],[1670335321587,1255.3624766942717],.....]}
 *   error: null,
 * }
 */

export const coingeckoGetTokenMarketChart = async (options) => {
  // checks
  checkInitialization()
  checkTypes(
    ['options', options, ['Object'], true],
  )
  const { id } = options
  checkTypes(
    ['id', id, ['String'], true],
  )

  let data 
  try{
    // get data from free api
    data = await api.externalRequests.coingeckoGetTokenMarketChart({...options, id})
  }catch(e){
    // get data from proxy api
    const url = e.config.url
    const route = url.substring(url.indexOf('/coins'));
    const res = await api.proxyRequests.executeCoingecko(route)
    data = res.data
  }

  return data
}