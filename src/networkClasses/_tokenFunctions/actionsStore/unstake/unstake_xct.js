import api from '../../../../api'
import { checkTypes } from '../../../../helpers/checkArguments'

export async function unstake_xct({ amount }) {
  // check arguments
  checkTypes(['amount', amount, ['String', 'Number'], true])

  // get rawTransaction
  const { data } = await api.requests.getXctUnstakeTransaction({
    address: this.address,
    amount,
  })

  // format transaction (signer waits for the 'transaction' field)
  data.transaction = data.tx
  delete data.tx

  // return raw transaction
  return data
}
