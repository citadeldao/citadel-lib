import api from '../../../../api'
import { checkTypes } from '../../../../helpers/checkArguments'

export async function transfer_default({
  token,
  amount,
  toAddress,
  fee,
  memo,
  gasPrice,
}) {
  // check arguments
  checkTypes(
    ['amount', amount, ['String', 'Number'], true],
    ['toAddress', toAddress, ['String'], true]
  )

  // get rawTransaction
  const { data } = await api.requests.prepareTransfer({
    net: token,
    from: this.address,
    toAddress,
    amount,
    fee,
    memo,
    publicKey: this.publicKey,
    gasPrice,
  })

  // return raw transaction
  return data
}
