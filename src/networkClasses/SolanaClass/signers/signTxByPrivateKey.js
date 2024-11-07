const solanaWeb3 = require("@solana/web3.js");

export const signTxByPrivateKey = async (rawTransaction, privateKey) => {
  const restoredTx = solanaWeb3.VersionedTransaction.deserialize(rawTransaction.serialize());
  restoredTx.sign([privateKey]);
  const signedTx = Buffer.from(restoredTx.serialize()).toString('hex') ;

  return signedTx;
}
  