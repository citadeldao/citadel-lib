import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import { getBip39WordList } from '../../generalFunctions/getBip39WordList'
/**
 * Get bip39 wordlist array
 *
 * @param language STRING (OPTIONAL) - 'english' by default
 * @returns Returns ARRAY - word list.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = citadel.getPossibleMnemonicWords()
 *
 * // =>
 * {
 *   result: "success",
 *   data: [
        "abandon",
        "ability",
        "able",
        "about",
        ...
      ],
 *   error: null
 * }
 */

export const getPossibleMnemonicWords = (language) => {
  // checks
  checkInitialization()
  checkTypes(['language', language, ['String']])

  // generate mnemonic by bit length
  return getBip39WordList(language)
}
