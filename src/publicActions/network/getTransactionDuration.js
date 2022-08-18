import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

/**
 * Returns expected transaction time
 *
 * @param net STRING (REQUIRED) - net key
 * @param options OBJECT (REQUIRED)
 * @param options.type STRING (REQUIRED) - type of transaction ('tranfer' etc )\
 * @param options.fee STRING (REQUIRED) - fee
 * 
 * @returns Returns an object with the maximum and minimum transaction execution time
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
  const response = await citadel.getTransactionDuration('secret', {
    type: 'transfer',
    fee: 0.000197
  })

  // =>
  {
    result: 'success',
    data: {
      min: 625,
      max: 169859,
      net: 'secret',
      type: 'transfer',
    },
    error: null,
  }
 */

export const getTransactionDuration = async (net, options = {}) => {
  // checks
  checkInitialization()
  checkTypes(['net', net, ['String'], true], ['options', options, ['Object']])
  checkNetwork(net)

  const { type, fee } = options
  checkTypes(
    ['type', type, ['String'], true],
    ['fee', fee, ['String', 'Number'], true]
  )

  // call static network method
  return await networkClasses
    .getNetworkClass(net)
    .getTransactionDuration({ type, fee })
}
