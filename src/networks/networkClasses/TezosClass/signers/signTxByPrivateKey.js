import blakejs from 'blakejs'
import { signMessageByEd25519 } from './functions'

export const signTxByPrivateKey = ({ opbytes }, privateKey) => {
  const watermark = Buffer.from([3])
  const bytes = Buffer.concat([watermark, Buffer.from(opbytes, 'hex')])
  const hash = blakejs.blake2b(bytes, undefined, 32)
  const sig = signMessageByEd25519(hash, privateKey)
  const sopbytes = opbytes + sig.toString('hex')

  return { sopbytes }
}
