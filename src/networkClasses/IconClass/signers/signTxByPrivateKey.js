import { toRawTransaction, generateHashKey } from './functions'
import { sha3_256 as sha3256 } from 'js-sha3'

function serialize(trasaction) {
  const phraseToSign = generateHashKey(trasaction)
  return sha3256.update(phraseToSign).hex()
}

export async function signTxByPrivateKey(transaction, privateKey) {
  // dynamic import for guge module
  const { default: secp256k1 } = await import('secp256k1')
  privateKey = Buffer.from(privateKey, 'hex')
  const rawTransaction = toRawTransaction(transaction)
  const result = secp256k1.ecdsaSign(
    Buffer.from(serialize(rawTransaction), 'hex'),
    privateKey
  )
  const recovery = new Uint8Array(1)
  const recid = result.recid
  const sgn = result.signature
  recovery[0] = recid

  const signature = new Uint8Array(sgn.length + recovery.length)
  signature.set(sgn, 0)
  signature.set(recovery, sgn.length)

  return {
    ...rawTransaction,
    signature: Buffer.from(signature).toString('base64'),
  }
}
