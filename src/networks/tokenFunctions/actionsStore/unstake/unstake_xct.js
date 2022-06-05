import api from '../../../../api'
import { checkTypes } from '../../../../helpers/checkArguments'

export default async function ({ amount }) {
  checkTypes(['amount', amount, ['String', 'Number'], true])

  const { data } = await api.requests.getXctUnstakeTransaction({
    address: this.address,
    amount,
  })
  // временный костыль
  data.transaction = data.tx
  delete data.tx

  return data
}
