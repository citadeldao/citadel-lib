import libCore from '../../libCore'
import {
  checkTypes,
  checkInitialization,
  checkNetwork,
} from '../../helpers/checkArguments'

export default async (net, address) => {
  checkInitialization()
  checkTypes(
    ['net', net, ['String'], true],
    ['address', address, ['String'], true]
  )
  checkNetwork(net)

  const { data } = await libCore.formattedApi.getDelegationBalance({
    net,
    address,
  })

  return data
}
