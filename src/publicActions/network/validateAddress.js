import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

/**
 * Checks if the address is correct
 *
 * @param net STRING (REQUIRED) - net key
 * @param address STRING (REQUIRED) - verified address
 * 
 * @returns Returns BOOLEAN - 'true' for correct address and 'false' for incorrect'
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = citadel.validateAddress(
    'btc',
    '1M5RzUcDqyiK15rGLdrU7JC3KCJEscDkki'
  )

  // =>
  {
    result: 'success',
    data: 'true',
    error: null,
  }
 */

export const validateAddress = (net, address) => {
  // checks
  checkInitialization()
  checkTypes(
    ['net', net, ['String'], true],
    ['address', address, ['String'], true]
  )
  checkNetwork(net)

  // call static network method
  return networkClasses.getNetworkClass(net).validateAddress(address)
}
