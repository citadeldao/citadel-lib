import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import errors from '../../errors'

/**
 * Generates a random mnemonic phrase of given length
 *
 * @param length STRING (OPTIONAL) - the number of words in a phrase. 12 to 24, multiple of 3. Default is 12.
 * @returns Returns STRING - mnemonic phrase.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.generateMnemonic(12)
 *
 * // =>
 * {
 *   result: "success",
 *   data: "depth sure hawk cruise brand circle explain announce fuel celery elegant sock",
 *   error: null
 * }
 */

export const generateMnemonic = async (length = 12) => {
  // dynamic import of large module (for fast init)
  const { generateMnemonic } = await import('bip39')
  // checks
  checkInitialization()
  checkTypes(['length', length, ['String', 'Number'], true])

  if (length % 3 !== 0 || length < 12 || length > 24) {
    errors.throwError('WrongArguments', {
      message: `Length must be between 12 and 24, a multiple of 3. Got '${length}'`,
    })
  }

  // phrase bit length (128-256)
  const entropy = (length * 32) / 3

  // generate mnemonic by bit length
  return generateMnemonic(entropy)
}
