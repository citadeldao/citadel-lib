import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

/**
 * Requests an array with a list of accounts (for IOST wallets)
 *
 * @param net  STRING (REQUIRED) - network or token key
 * @param privateKey STRING (REQUIRED) - private key string
 * @returns Returns ARRAY with accounts info
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getAccountsByPrivateKey({
 *   net: 'iost',
 *   privateKey: '4pDvjaQxDkpyA9r5ZJWQ7Vk2Gciy6M9pwEj92nBJmkMo4EpwP9R4ygERZbmocJjrCn2LDYoFZzcwUNkfTpwrqyt2'
 * })
 *
 * // =>
 * {
 *   result: 'success',
 *   data: [
 *     {
 *       name: 'citazuxqeh4',
 *       create_time: 1623073514500166000,
 *       creator: 'citadel_pay',
 *       account_info: {
 *         //..
 *       },
 *     },
 *     // ...
 *   ],
 *   error: null,
 * }
 */

export const getAccountsByPrivateKey = (net, privateKey) => {
  // checks
  checkInitialization()
  checkTypes(
    ['net', net, ['String'], true],
    ['privateKey', privateKey, ['String'], true]
  )
  checkNetwork(net)

  // call static network method
  return networkClasses.getNetworkClass(net).getAccountsByPrivateKey(privateKey)
}
