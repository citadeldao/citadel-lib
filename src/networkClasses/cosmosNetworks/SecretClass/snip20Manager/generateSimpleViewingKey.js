import crypto from 'crypto'
import errors from '../../../../errors'

export function generateSimpleViewingKey(contractAddress, privateKeyHash) {
  // check privateKeyHash
  if (!privateKeyHash) {
    errors.throwError('ViewingKeyError', {
      message: 'PrivateKeyHash does not exist',
    })
  }

  return `api_key_${crypto
    .createHash('sha256')
    .update(`${contractAddress}${privateKeyHash}`)
    .digest('hex')}`
}
