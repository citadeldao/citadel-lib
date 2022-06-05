import { checkTypes } from '../../../../helpers/checkArguments'
import api from '../../../../api'

export default async function ({ amount }) {
  checkTypes(['amount', amount, ['String', 'Number'], true])

  const { data } = await api.requests.getXctStakeTransaction({
    address: this.address,
    amount,
  })
  data.transaction = data.tx
  delete data.tx

  return data
}
