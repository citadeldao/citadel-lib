import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetworkOrToken,
  checkInitialization,
} from '../../helpers/checkArguments'

/**
 * Decodes a string with an encrypted private key (AES)
 *
 * @param netOrToken STRING (REQUIRED) - network or token key
 * @param encodedPrivateKey STRING (REQUIRED) - encoded private key string
 * @param password  STRING (REQUIRED) - user password
 * @returns Returns STRING with decoded password
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = citadel.decodePrivateKeyByPassword(
 *  'akash',
 *  'U2FsdGVkX1/FKZoE8d1/A6wYJc5poAARMcpMmTitLtR0OgydCIq0MdxxanOV47YHcTDFBq3w3982jX4F/MGVHOhotXV7rI6KYuvXH39j7s4nPTCIfIjhc+HxSVgx3ABe',
 *  '11111111'
  )
 *
 * // =>
 * {
 *  result: 'success',
 *  data: 'c045f2a05787fe519e03d078c059b44a43fa97c4e9c1e5e7ba871b3064da551d',
 *  error: null,
 *}
 */

export const decodePrivateKeyByPassword = (
  netOrToken,
  encodedPrivateKey,
  password
) => {
  // checks
  checkInitialization()

  checkTypes(
    ['netOrToken', netOrToken, ['String'], true],
    ['encodedPrivateKey', encodedPrivateKey, ['String'], true],
    ['password', password, ['String'], true]
  )

  checkNetworkOrToken(netOrToken)

  // get native net
  const nativeNet = networkClasses.getNativeNet(netOrToken)

  // call static native network method
  return networkClasses
    .getNetworkClass(nativeNet)
    .decodePrivateKeyByPassword(encodedPrivateKey, password)
}
