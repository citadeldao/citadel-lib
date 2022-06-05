import crypto from 'crypto'

export function generateSimpleViewingKey(contractAddress, privateKeyHash) {
  return `api_key_${crypto
    .createHash('sha256')
    .update(`${contractAddress}${privateKeyHash}`)
    .digest('hex')}`
}
