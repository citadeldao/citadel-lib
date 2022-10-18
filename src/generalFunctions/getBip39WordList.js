import { wordlists, getDefaultWordlist } from 'bip39'

import errors from '../errors'

/************* GENERATE BIP39 MNEMONIC PHRASE *************
 * Generates a mnemonic phrase of the given length.
 **********************************************************/

export const getBip39WordList = (language = getDefaultWordlist()) => {
  const languages = Object.keys(wordlists)
  if (!languages.includes(language)) {
    errors.throwError('WrongArguments', {
      message: `Invalid language. Expected '${languages.join(
        ', '
      )}'. Got '${language}'`,
    })
  }

  // return words array
  return wordlists[language]
}
