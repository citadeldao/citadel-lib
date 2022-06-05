import { checkTypes } from '../../../../helpers/checkArguments'
import api from '../../../../api'

export default async function (options) {
  const { amount, toAddress } = options
  checkTypes(
    ['amount', amount, ['String', 'Number'], true],
    ['toAddress', toAddress, ['String'], true]
  )
  const { data } = await api.requests.prepareTransfer({
    net: this.net,
    from: this.address,
    ...options,
  })
  return data
}
