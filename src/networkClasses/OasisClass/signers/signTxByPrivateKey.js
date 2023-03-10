import { generateContext } from './functions'

export const signTxByPrivateKey = async (rawTransaction, privateKey) => {
  // dynamic import of large module (for fast init)
  const { signature } = await import('@oasisprotocol/client')
  const src = signature.NaclSigner.fromSecret(
    Buffer.from(privateKey, 'base64'),
    'this key is not important'
  )
  let signer = new signature.BlindContextSigner(src)
  const context = await generateContext()
  let signedTx = await signature.signSigned(signer, context, rawTransaction)
  return signedTx
}