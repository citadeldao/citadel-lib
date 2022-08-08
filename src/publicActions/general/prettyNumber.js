import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import { prettyNumber as prettyNumberFunction } from '../../generalFunctions/prettyNumber'
/**
 * Generates a random mnemonic phrase of given length
 *
 * @param value STRING, NUMBER (OPTIONAL) - converts long numbers to a human-readable string
 * @returns STRING - shorthand notation for a number with a letter index. For non-numeric strings will return the string unchanged
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = citadel.prettyNumber(1234567)
 *
 * // =>
 * {
 *   result: "success",
 *   data: "1.23М",
 *   error: null
 * }
 */

export const prettyNumber = (value) => {
  // checks
  checkInitialization()
  checkTypes(['value', value, ['String', 'Number'], true])

  return prettyNumberFunction(value)
}
