import { createMessageSignatureByPrivateKey } from './createMessageSignatureByPrivateKey'

export const signJsonByPrivateKey = async (
  transaction,
  privateKey,
  publicKey
) => {
  privateKey = privateKey.replace('0x', '')

  const signature = createMessageSignatureByPrivateKey(
    transaction.json,
    privateKey
  )

  return {
    ...transaction.json,
    publicKey,
    signType: 'json',
    signature,
  }
}
