import api from '../../api'
import { checkInitialization } from '../../helpers/checkArguments'

/**
 * Load user rewards and claims
 *
 * @returns Returns an object with user rewards and claims
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getRewards()
 *
 * // =>
 * {
 *   "result": "success",
 *   "data": {
 *     "claims": [
 *       {
 *         "net": "secret",
 *         "address": "secret1ytpnwlvz69z7u8rd4yqa8dxr33ygl7n28t2kpq",
 *         "symbol": "SCRT",
 *         "reward": 0,
 *         "stake": true
 *       }
 *     ],
 *     "rewards": {
 *       "date_from": "2022-01-05T12:53:39.659Z",
 *       "date_to": "2022-02-04T12:53:39.659Z",
 *       "list": {
 *         "comdex": {
 *           "total": 0.000001,
 *           "totalUSD": 0,
 *           "symbol": "CMDX",
 *           "addresses": [
 *             {
 *               "address": "comdex1eksvfd7400dr6fvkdh4mshfkukm9u8aq2les58",
 *               "rewards": 0.000001
 *             }
 *           ]
 *         }
 *       }
 *     },
 *     "total": 0.16
 *   },
 *   "error": null
 * }
 */

export const getRewards = async () => {
  // checks
  checkInitialization()

  // get data from api
  const { data } = await api.requests.getRewards()
  return data
}
