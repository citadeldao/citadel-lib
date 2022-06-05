import api from '../../../../api'
import { checkTypes } from '../../../../helpers/checkArguments'

export default async function ({ token, amount, toAddress, fee, memo }) {
  checkTypes(
    ['amount', amount, ['String', 'Number'], true],
    ['toAddress', toAddress, ['String'], true]
  )
  const { data } = await api.requests.prepareTransfer({
    net: token,
    from: this.address,
    toAddress,
    amount,
    fee,
    memo,
    publicKey: this.publicKey,
  })
  return data
}
