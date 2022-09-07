import { decodeMnemonic } from '../../generalFunctions/decodeMnemonic'
import {
  checkTypes,
  checkInitialization,
} from '../../helpers/checkArguments'
import errors from '../../errors'

/**
 * Encrypts a string with a mnemonic (AES-128, AES-192, AES-256 depending on the length of password).
 *
 * @param encodedMnemonic STRING (REQUIRED) - encoded user mnemonic
 * @param password  STRING (REQUIRED) - user password
 * @returns Returns STRING with encoded mnemonic
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = citadel.decodeMnemonicByPassword(
 *  'U2FsdGVkX1+ozflhwWXUkr19S9cEQDjQa407GZOPH11aRdCgT/KZcMuWu1QH3FSOhtCAC5XjSowZFwkHJNxkXyDCrJtrjhdgQmwjwSQojvrfs7oH8z34JOuo7bAjMCIl2xtkkE+oaL4Ck5puC6rTYg==',
 *  '11111111'
 *)
 *
 * // =>
 * {
 *  result: 'success',
 *  data: 'injury warfare increase easy bottom token review neutral walnut poem curve display',
 *  error: null,
 *}
 */

export const decodeMnemonicByPassword = (encodedMnemonic, password) => {
  checkInitialization()

  checkTypes(
    ['encodedMnemonic', encodedMnemonic, ['String'], true],
    ['password', password, ['String'], true]
  )

  if (password === '') {
    errors.throwError('WrongArguments', { message: 'Empty password' })
  }

  // call static native network method
  return decodeMnemonic(encodedMnemonic, password)
}
