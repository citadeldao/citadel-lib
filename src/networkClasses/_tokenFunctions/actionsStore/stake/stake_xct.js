import { checkTypes } from '../../../../helpers/checkArguments'
import api from '../../../../api'

export async function stake_xct({ amount }) {
  // check amount type
  checkTypes(['amount', amount, ['String', 'Number'], true])

  // get rawTransaction
  const { data } = await api.requests.getXctStakeTransaction({
    address: this.address,
    amount,
  })

  // format transaction (signer waits for the 'transaction' field)
  data.transaction = data.tx
  delete data.tx

  // return raw transaction
  return data
}
