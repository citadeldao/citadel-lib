import errors from '../../../../errors'
import { checkTypes } from '../../../../helpers/checkArguments'
import api from '../../../../api'

export async function restake_xct(options) {
  const { type } = options
  checkTypes(['type', type, ['String'], true])

  // each type has its own request
  const requests = {
    all: 'restakeAllRewards',
    xct: 'restakeXctRewards',
    dao: 'restakeDaoRewards',
  }

  // validate type
  if (!Object.keys(requests).includes(type)) {
    errors.throwError('WrongArguments', {
      message: `Invalid type of restake_xct. Expected '${Object.keys(
        requests
      ).join(', ')}', got '${type}'`,
    })
  }

  // get raw transaction
  const { data } = await api.requests[requests[type]]({
    address: this.address,
  })

  // format transaction (signer waits for the 'transaction' field)
  data.transaction = data.txs || data.tx
  delete data.txs
  delete data.tx

  // return raw transaction
  return data
}
