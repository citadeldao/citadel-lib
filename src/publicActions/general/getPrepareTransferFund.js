import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import api from '../../api'

/**
 * Prepares a raw transaction for private claim (for investors)
 *
 * @param bscAddress STRING (REQUIRED) - Binance Smart Chain address
 * @param category STRING (REQUIRED) - category, possible values: "community", "foundation", "ecosystem"
 * @param amount  STRING (REQUIRED)
 * @param recipient  STRING (REQUIRED)
 * @returns Returns OBJECT.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getPrepareTransferFund(
 *   '0x30e8a9327160f6582e040236567ec6d3ac075b27',
 *   'advisors'
 * )
 *
 * // =>
 * // (on error)
 * {
 *   result: 'error',
 *   data: null,
 *   error: {
 *     name: 'RequestError',
 *     status: 400,
 *     message: "Multisig: You cannot execute this method"
 *   },
 * }
 */

export const getPrepareTransferFund = async (
  bscAddress,
  category,
  amount,
  recipient
) => {
  // checks
  checkInitialization()
  checkTypes(
    ['bscAddress', bscAddress, ['String'], true],
    ['category', category, ['String'], true],
    ['amount', amount, ['String', 'Number'], true],
    ['recipient', recipient, ['String'], true]
  )

  // get data from api
  const { data } = await api.requests.getPrepareTransferFund({
    category,
    amount,
    recipient,
    address: bscAddress,
  })

  return data
}
