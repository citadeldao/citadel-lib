import networks from '../../networks'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

export default async (net, options = {}) => {
  checkInitialization()
  checkTypes(['net', net, ['String'], true], ['options', options, ['Object']])
  checkNetwork(net)

  const { type, fee } = options
  checkTypes(
    ['type', type, ['String'], true],
    ['fee', fee, ['String', 'Number'], true]
  )

  return await networks
    .getNetworkClass(net)
    .getTransactionDuration({ type, fee })
}
