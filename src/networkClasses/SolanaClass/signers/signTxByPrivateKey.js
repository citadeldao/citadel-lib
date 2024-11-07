const solanaWeb3 = require("@solana/web3.js");

export const signTxByPrivateKey = async (rawTransaction, privateKey) => {
  const buffPrv = Buffer.from(privateKey, 'hex');
  const kPair = solanaWeb3.Keypair.fromSecretKey(Uint8Array.from(buffPrv));

  const restoredTx = solanaWeb3.VersionedTransaction.deserialize(rawTransaction.serialize());
  restoredTx.sign([kPair]);
  const signedTx = Buffer.from(restoredTx.serialize()).toString('hex') ;

  return signedTx;
}
  