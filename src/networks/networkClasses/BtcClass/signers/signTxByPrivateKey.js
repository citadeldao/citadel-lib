import { ECPair, Psbt } from 'bitcoinjs-lib'

export const signTxByPrivateKey = (rawTransaction, privateKey) => {
  const keyPair = ECPair.fromWIF(privateKey)
  const psbt = Psbt.fromBase64(rawTransaction)

  psbt.signAllInputs(keyPair)
  psbt.validateSignaturesOfAllInputs()
  psbt.finalizeAllInputs()

  const tx = psbt.extractTransaction()
  const txHex = tx.toHex()

  return txHex
}
