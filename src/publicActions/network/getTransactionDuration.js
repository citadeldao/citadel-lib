import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

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
