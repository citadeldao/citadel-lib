import api from '../../api'
import {
  checkTypes,
  checkInitialization,
  checkNetwork,
} from '../../helpers/checkArguments'

export const getBalanceByAddress = async (net, address) => {
  // checks
  checkInitialization()
  checkTypes(
    ['net', net, ['String'], true],
    ['address', address, ['String'], true]
  )
  checkNetwork(net)

  // call api
  const { data } = await api.formattedApi.getDelegationBalance({
    net,
    address,
  })

  return data
}
