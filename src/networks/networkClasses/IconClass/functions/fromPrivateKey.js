import secp256k1 from 'secp256k1'
import { sha3_256 } from 'js-sha3'

const isPrivateKey = (privKey) => {
  if (!privKey) {
    return false
  }
  if (typeof privKey === 'string') {
    return /^[0-9a-f]{64}$/g.test(privKey) && /\S/g.test(privKey)
  }
  return secp256k1.privateKeyVerify(Buffer.from(privKey, 'hex'))
}

export const fromPrivateKey = (prvKey) => {
  const prefix = 'hx'
  if (!isPrivateKey(prvKey))
    throw new Error(`[${prvKey}] is not a valid private key.`)

  const pkBuffer = Buffer.from(prvKey, 'hex')
  const pubKey = secp256k1.publicKeyCreate(pkBuffer, false)
  const address = prefix + sha3_256(pubKey.slice(1)).slice(-40)

  return {
    prvKey,
    pubKey,
    address,
  }
}
