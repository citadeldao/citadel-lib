import { encodeMnemonic } from '../../generalFunctions/encodeMnemonic'
import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import errors from '../../errors'

/**
 * Encrypts a string with a mnemonic (AES-128, AES-192, AES-256 depending on the length of password).
 *
 * @param mnemonic STRING (REQUIRED) - user mnemonic
 * @param password  STRING (REQUIRED) - user password
 * @returns Returns STRING with encoded mnemonic
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = citadel.encodeMnemonicByPassword(
 *  'injury warfare increase easy bottom token review neutral walnut poem curve display',
 *  '11111111'
 *)
 *
 * // =>
 * {
 *  result: 'success',
 *  data: 'U2FsdGVkX1+ozflhwWXUkr19S9cEQDjQa407GZOPH11aRdCgT/KZcMuWu1QH3FSOhtCAC5XjSowZFwkHJNxkXyDCrJtrjhdgQmwjwSQojvrfs7oH8z34JOuo7bAjMCIl2xtkkE+oaL4Ck5puC6rTYg==',
 *  error: null,
 *}
 */

export const encodeMnemonicByPassword = async (mnemonic, password) => {
  checkInitialization()

  checkTypes(
    ['mnemonic', mnemonic, ['String'], true],
    ['password', password, ['String'], true]
  )

  if (password === '') {
    errors.throwError('WrongArguments', { message: 'Empty password' })
  }

  // call static native network method
  const mnemonicEncoded = await encodeMnemonic(mnemonic, password)

  if (mnemonicEncoded.includes(mnemonic)) {
    errors.throwError('LibraryError', { message: 'Encoder is broken' })
  }

  return mnemonicEncoded
}
