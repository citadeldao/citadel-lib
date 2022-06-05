import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import api from '../../api'

export default async (bscAddress, category) => {
  checkInitialization()
  checkTypes(
    ['bscAddress', bscAddress, ['String'], true],
    ['category', category, ['String']]
  )

  const { data } = await api.requests.getBalanceFund({
    category,
    address: bscAddress,
  })

  return data
}
