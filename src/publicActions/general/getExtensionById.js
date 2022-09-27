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
 * const response = await citadel.getExtensionById(id)
 *
 * // =>
 * {
 *   result: 'success',
 *   data: {
    "token": "2613a2cd-5552-43a4-9d1e-0fc9a8132018",
    "wallets": [],
    "app_user_id": "02a4124b195bb8effb589869b35a7891"
    },
 *   error: null,
 * }
 */

export const getExtensionById = async (id) => {
  // checks
  checkInitialization()
  checkTypes(['id', id, ['String', 'Number']])

  // get data from api
  const { data } = await api.requests.getExtensionById({ id })
  return data
}
