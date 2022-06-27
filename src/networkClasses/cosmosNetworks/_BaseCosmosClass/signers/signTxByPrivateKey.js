/* eslint-disable */
import { ECPair } from 'bitcoinjs-lib'
const secp256k1 = require('secp256k1')
const crypto = require('crypto')

// ecpariPriv: Buffer(32)
export const signTxByPrivateKey = (stdSignMsg, privateKey, publicKey) => {
  privateKey = privateKey.replace('0x', '')
  const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'))
  const signMessage = stdSignMsg.json
  const hash = crypto
    .createHash('sha256')
    .update(Buffer.from(stdSignMsg.bytes))
    .digest('hex')
  const { signature } = secp256k1.ecdsaSign(
    Buffer.from(hash, 'hex'),
    keyPair.privateKey
  )
  const signatureHex = Buffer.from(signature).toString('hex')

  return {
    ...signMessage,
    signature: signatureHex,
    publicKey,
  }
}
