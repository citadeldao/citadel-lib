export const signTxByPrivateKey = async (rawTransaction, privateKey) => {
  // dynamic import of large module (for fast init)
  const { default: TronWeb } = await import('tronweb')

  const tronInstance = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    privateKey: privateKey,
  })
  const signedTx = await tronInstance.trx.sign(rawTransaction, privateKey)
  return signedTx
}
