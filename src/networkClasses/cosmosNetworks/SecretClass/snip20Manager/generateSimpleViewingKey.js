import errors from '../../../../errors'

export async function generateSimpleViewingKey(
  contractAddress,
  privateKeyHash
) {
  // check privateKeyHash
  if (!privateKeyHash) {
    errors.throwError('ViewingKeyError', {
      message: 'PrivateKeyHash does not exist',
    })
  }

  // dynamic import of large module (for fast init)
  const { default: crypto } = await import('crypto')

  return `api_key_${crypto
    .createHash('sha256')
    .update(`${contractAddress}${privateKeyHash}`)
    .digest('hex')}`
}
