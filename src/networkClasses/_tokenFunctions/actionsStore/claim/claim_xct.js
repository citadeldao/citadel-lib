import api from '../../../../api'
import errors from '../../../../errors'
import { checkTypes } from '../../../../helpers/checkArguments'

export async function claim_xct(options) {
  const { type } = options
  checkTypes(['type', type, ['String'], true])

  // each type has its own request
  const requestNames = {
    all: 'claimAllRewards',
    xct: 'claimXctRewards',
    dao: 'claimDaoRewards',
  }

  // validate type
  if (!Object.keys(requestNames).includes(type)) {
    errors.throwError('WrongArguments', {
      message: `Invalid type of claim_xct. Expected '${Object.keys(
        requestNames
      ).join(', ')}', got '${type}'`,
    })
  }

  // get raw transaction
  const { data } = await api.requests[requestNames[type]]({
    address: this.address,
  })

  // format transaction (signer waits for the 'transaction' field)
  data.transaction = data.txs || data.tx
  delete data.txs
  delete data.tx

  // return raw transaction
  return data
}
