import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import api from '../../api'

/**
 * Prepares a raw transaction for private claim (for investors)
 *
 * @param bscAddress STRING (REQUIRED) - Binance Smart Chain address
 * @param category STRING (REQUIRED) - category, possible values: "advisors", "private1", "private2", "team"
 * @returns Returns OBJECT.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getPreparePrivateClaim(
 *   '0x30e8a9327160f6582e040236567ec6d3ac075b27',
 *   'advisors'
 * )
 *
 * // =>
 * {
 *   result: 'success',
 *   data: {
 *     tx: {
 *       from: '0x30e8a9327160f6582e040236567ec6d3ac075b27',
 *       to: '0xD54b7C57A7F15506Eb3BaADE44755A568e80C6BF',
 *       data: '0x4e71d92d',
 *       gas: 28973,
 *       nonce: 145,
 *       gasPrice: '6000000000',
 *       chainId: 56,
 *     },
 *     fee: 0.000173838,
 *   },
 *   error: null,
 * }
 */

export const getPreparePrivateClaim = async (bscAddress, category) => {
  // checks
  checkInitialization()
  checkTypes(
    ['bscAddress', bscAddress, ['String'], true],
    ['category', category, ['String'], true]
  )

  // get data from api
  const { data } = await api.requests.getPreparePrivateClaim({
    category,
    address: bscAddress,
  })

  return data
}
