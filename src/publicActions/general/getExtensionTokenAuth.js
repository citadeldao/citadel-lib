import api from '../../api'
import { checkInitialization, checkTypes } from '../../helpers/checkArguments'

/**
 * Serach extension by query string
 *
 * @param id STRING, NUMBER (REQUIRED) - string to search
 *
 * @returns Returns OBJECT with app info.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getExtensionTokenAuth({id, wallets)
 *
 * // =>
 * {
 *   result: 'success',
 *   data: {
    "token": "2613a2cd-5552-43a4-9d1e-0fc9a8132018",
    "app_user_id": "02a4124b195bb8effb589869b35a7891"
    },
 *   error: null,
 * }
 */

export const getExtensionTokenAuth = async ({id, wallets = []}) => {
  // checks
  checkInitialization()
  checkTypes(
    ['id', id, ['String', 'Number'],true],
    ['wallets', wallets, ['Array']]
    )

  // get data from api
  const { data } = await api.requests.getExtensionTokenAuth({ id, wallets })
  return data
}
