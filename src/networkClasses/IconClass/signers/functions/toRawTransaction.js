import { toHexNumber } from '../../../_functions/crypto'

export async function toRawTransaction(transaction) {
  const {
    to,
    from,
    stepLimit,
    nid,
    version,
    timestamp,
    value,
    nonce,
    data,
    dataType,
  } = transaction

  const rawTransaction = {
    to,
    from,
    stepLimit: await toHexNumber(stepLimit),
    nid: await toHexNumber(nid),
    version: await toHexNumber(version),
    timestamp: await toHexNumber(timestamp),
  }

  if (value) {
    rawTransaction.value = await toHexNumber(value)
  }

  if (nonce) {
    rawTransaction.nonce = await toHexNumber(nonce)
  }

  if (dataType) {
    rawTransaction.dataType = dataType
  }

  if (['call', 'deploy', 'message'].includes(dataType || '') && data) {
    rawTransaction.data = data
  }

  return rawTransaction
}
