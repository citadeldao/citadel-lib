import api from '../../../../api'
import errors from '../../../../errors'
import { checkTypes } from '../../../../helpers/checkArguments'

export default async function (options) {
  const { type } = options
  checkTypes(['type', type, ['String'], true])

  const requestNames = {
    all: 'claimAllRewards',
    xct: 'claimXctRewards',
    dao: 'claimDaoRewards',
  }
  if (!Object.keys(requestNames).includes(type)) {
    errors.throwError('WrongArguments', {
      message: `Invalid type of claim_xct. Expected '${Object.keys(
        requestNames
      ).join(', ')}', got '${type}'`,
    })
  }

  const { data } = await api.requests[requestNames[type]]({
    address: this.address,
  })

  // временный костыль
  data.transaction = data.txs || data.tx
  delete data.txs
  delete data.tx

  return data
}
