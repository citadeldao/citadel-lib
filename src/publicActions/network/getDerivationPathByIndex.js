import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

/**
 * Returns a string with derivationPath by index number
 *
 * @param net STRING (REQUIRED) - network key
 * @param options OBJECT (REQUIRED)
 * @param options.type OBJECT (REQUIRED) - 
template type ('seed', 'ledger', 'trezor')
 * 
 * @returns Returns STRING with derivation path.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getDerivationPathByIndex('secret', {
 *   type: 'seed',
 *   index: 5
 * })
 *
 * // =>
 * {
 *   result: 'success',
 *   data: "m/44'/529'/0'/0/5",
 *   error: null,
 * }
 */

export const getDerivationPathByIndex = (net, type, index) => {
  // checks
  checkInitialization()
  checkTypes(
    ['net', net, ['String'], true],
    ['type', type, ['String']],
    ['index', index, ['String', 'Number']]
  )
  checkNetwork(net)

  // call static network method
  return networkClasses
    .getNetworkClass(net)
    .getDerivationPathByIndex(type, index)
}
