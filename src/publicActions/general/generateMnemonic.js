import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import { generateBip39Mnemonic } from '../../generalFunctions/generateBip39Mnemonic'
/**
 * Generates a random mnemonic phrase of given length
 *
 * @param length STRING (OPTIONAL) - the number of words in a phrase. 12 to 24, multiple of 3. Default is 12.
 * @returns Returns STRING - mnemonic phrase.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = citadel.generateMnemonic(12)
 *
 * // =>
 * {
 *   result: "success",
 *   data: "depth sure hawk cruise brand circle explain announce fuel celery elegant sock",
 *   error: null
 * }
 */

export const generateMnemonic = async (length = 12) => {
  // checks
  checkInitialization()
  checkTypes(['length', length, ['String', 'Number'], true])

  // generate mnemonic by bit length
  return generateBip39Mnemonic(length)
}
