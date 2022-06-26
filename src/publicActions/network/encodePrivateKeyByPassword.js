import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetworkOrToken,
  checkInitialization,
} from '../../helpers/checkArguments'

/**
 * Encrypts a string with a private key (AES-128, AES-192, AES-256 depending on the length of password).
 *
 * @param netOrToken STRING (REQUIRED) - network or token key
 * @param privateKey  STRING (REQUIRED) - string with private key
 * @param password  STRING (REQUIRED) - user password
 * @returns Returns STRING with encoded password
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = citadel.encodePrivateKeyByPassword(
 *  'akash',
 *  'c045f2a05787fe519e03d078c059b44a43fa97c4e9c1e5e7ba871b3064da551d',
 *  '11111111'
 *)
 *
 * // =>
 * {
 *  result: 'success',
 *  data: 'U2FsdGVkX1/FKZoE8d1/A6wYJc5poAARMcpMmTitLtR0OgydCIq0MdxxanOV47YHcTDFBq3w3982jX4F/MGVHOhotXV7rI6KYuvXH39j7s4nPTCIfIjhc+HxSVgx3ABe',
 *  error: null,
 *}
 */

export const encodePrivateKeyByPassword = async (
  netOrToken,
  privateKey,
  password
) => {
  checkInitialization()

  checkTypes(
    ['net', netOrToken, ['String'], true],
    ['netOrToken', privateKey, ['String'], true],
    ['password', password, ['String'], true]
  )
  checkNetworkOrToken(netOrToken)

  // get native net
  const nativeNet = networkClasses.getNativeNet(netOrToken)

  // call static native network method
  return await networkClasses
    .getNetworkClass(nativeNet)
    .encodePrivateKeyByPassword(privateKey, password)
}
