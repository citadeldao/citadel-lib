import errors from '../../../../errors'
import { checkTypes } from '../../../../helpers/checkArguments'
import api from '../../../../api'

export default async function (options) {
  const { type } = options
  checkTypes(['type', type, ['String'], true])

  const requests = {
    all: 'restakeAllRewards',
    xct: 'restakeXctRewards',
    dao: 'restakeDaoRewards',
  }
  if (!Object.keys(requests).includes(type)) {
    errors.throwError('WrongArguments', {
      message: `Invalid type of restake_xct. Expected '${Object.keys(
        requests
      ).join(', ')}', got '${type}'`,
    })
  }

  const { data } = await api.requests[requests[type]]({
    address: this.address,
  })
  // временный костыль
  data.transaction = data.txs || data.tx
  delete data.txs
  delete data.tx

  return data
}
