import errors from '../errors'

/************* GENERATE BIP39 MNEMONIC PHRASE *************
 * Generates a mnemonic phrase of the given length.
 **********************************************************/

export const generateBip39Mnemonic = async (length) => {
  // dynamic import of large module (for fast init)
  const { generateMnemonic } = await import('bip39')

  if (length % 3 !== 0 || length < 12 || length > 24) {
    errors.throwError('WrongArguments', {
      message: `Length must be between 12 and 24, a multiple of 3. Got '${length}'`,
    })
  }

  // phrase bit length (128-256)
  const entropy = (length * 32) / 3

  return generateMnemonic(entropy)
}
