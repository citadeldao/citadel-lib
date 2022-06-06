import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

/**
 * 
Returns the cached network configuration
 *
 * @param net STRING (REQUIRED) - network key
 * 
 * @returns Returns ARRAY with templates
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getDerivationPathTemplates('secret', {
 *   net: 'band',
 *   type: 'seed'
 * })
 *
 * // =>
 * {
 *   result: 'success',
 *   data: [
 *     {
 *       id: 1,
 *       label: "Default - m/44'/494'/0'/0/N",
 *       key: "m/44'/494'/0'/0/N",
 *     },
 *     {
 *       id: 2,
 *       label: "Derivation template 2 - m/44'/494'/N'",
 *       key: "m/44'/494'/N'",
 *     },
 *     {
 *       id: 3,
 *       label: "Derivation template 3 - m/44'/494'/0'/N/0",
 *       key: "m/44'/494'/0'/N/0",
 *     },
 *   ],
 *   error: null,
 * }
 */

export const getDerivationPathTemplates = (net, type) => {
  // checks
  checkInitialization()
  checkTypes(['net', net, ['String'], true], ['type', type, ['String']])
  checkNetwork(net)

  // call static network method
  return networkClasses.getNetworkClass(net).getDerivationPathTemplates(type)
}
