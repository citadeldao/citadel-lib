import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import api from '../../api'

export default async (bscAddress, category, amount, recipient) => {
  checkInitialization()
  checkTypes(
    ['bscAddress', bscAddress, ['String'], true],
    ['category', category, ['String'], true],
    ['amount', amount, ['String', 'Number'], true],
    ['recipient', recipient, ['String'], true]
  )

  const { data } = await api.requests.getPrepareTransferFund({
    category,
    amount,
    recipient,
    address: bscAddress,
  })

  return data
}
