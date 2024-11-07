export const signTxByPrivateKey = async (rawTransaction, privateKey) => {
    // dynamic import of large module (for fast init)
    const { ECPair, Psbt } = await import('bitcoinjs-lib')
  
    const keyPair = ECPair.fromWIF(privateKey)
    const psbt = Psbt.fromBase64(rawTransaction)
  
    psbt.signAllInputs(keyPair)
    psbt.validateSignaturesOfAllInputs()
    psbt.finalizeAllInputs()
  
    const tx = psbt.extractTransaction()
    const txHex = tx.toHex()
  
    return txHex
  }
  