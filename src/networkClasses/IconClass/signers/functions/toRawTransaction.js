import { toHexNumber } from '../../../_functions/crypto'

export function toRawTransaction(transaction) {
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
    stepLimit: toHexNumber(stepLimit),
    nid: toHexNumber(nid),
    version: toHexNumber(version),
    timestamp: toHexNumber(timestamp),
  }

  if (value) {
    rawTransaction.value = toHexNumber(value)
  }

  if (nonce) {
    rawTransaction.nonce = toHexNumber(nonce)
  }

  if (dataType) {
    rawTransaction.dataType = dataType
  }

  if (['call', 'deploy', 'message'].includes(dataType || '') && data) {
    rawTransaction.data = data
  }

  return rawTransaction
}
