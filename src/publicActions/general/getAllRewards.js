import api from '../../api'
import { checkInitialization } from '../../helpers/checkArguments'

/**
 * Loads all user rewards
 *
 * @returns Returns an object with user rewards divided into groups by networks and addresses
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getAllRewards()
 *
 * // =>
 * {
 * result: 'success',
 * data: {
 *   comdex: {
 *     comdex1eksvfd7400dr6fvkdh4mshfkukm9u8aq2les58: 0.000001,
 *   },
 *   icon: {
 *     hxeab45ca8e8a496b51d1201712440f1cebe473d30: 0.122240697169845,
 *   },
 *   juno: {
 *     juno1eksvfd7400dr6fvkdh4mshfkukm9u8aqmzcf2v: 0.00011,
 *   },
 *   osmosis: {
 *     osmo1eksvfd7400dr6fvkdh4mshfkukm9u8aq9tgzmz: 0.008893,
 *   },
 *   cosmos: {
 *     cosmos1eksvfd7400dr6fvkdh4mshfkukm9u8aqdsmjds: 0.028234,
 *   },
 *   tez: {
 *     tz1a1H8G7sXrXEhQ99tdcJSK6amHyjUAtuY5: 32.695446,
 *   },
 *   secret: {
 *     secret1ytpnwlvz69z7u8rd4yqa8dxr33ygl7n28t2kpq: 0.398665,
 *   },
 *   kava: {
 *     kava16luyu67vmk6jrzwzanemcf9f5hha6ms6a43tg4: 0.112881,
 *   },
 *   band: {
 *     band1h7h3u44f2dwy42vdxl0r0gfee6dlgh3scspvju: 0.016887,
 *   },
 *   iost: {
 *     citazuxqeh4: 0.15407743,
 *   },
 *   akash: {
 *     akash1eksvfd7400dr6fvkdh4mshfkukm9u8aqqtk452: 0.345873,
 *   },
 * },
 * error: null,
 * }
 */

export const getAllRewards = async () => {
  // checks
  checkInitialization()

  // get rewards from api
  const { data } = await api.requests.getAllRewards()
  return data
}
