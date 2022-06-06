import { checkInitialization } from '../../helpers/checkArguments'
import { prepareTrezorConnection } from '../../networkClasses/_functions/trezor'

/**
 * Prepares connection with Trezor Device
 *
 * @returns Returns NULL.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.checkTrezorConnect()
 *
 * // =>
 * {
 *   result: "success",
 *   data: null,
 *   error: null
 * }
 */

export const checkTrezorConnect = async () => {
  // checks
  checkInitialization()
  // prepare trezor
  return await prepareTrezorConnection()
}
