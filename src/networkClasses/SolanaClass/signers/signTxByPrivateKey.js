const solanaWeb3 = require("@solana/web3.js");

export const signTxByPrivateKey = async (rawTransaction, privateKey) => {
  const buffPrv = Buffer.from(privateKey, 'hex');
  const kPair = solanaWeb3.Keypair.fromSecretKey(Uint8Array.from(buffPrv));

  const tx = Buffer.from(rawTransaction.txs[0].tx, 'hex');
  const restoredTx = solanaWeb3.VersionedTransaction.deserialize(tx);
  
  restoredTx.sign([kPair]);
  const signedTx = Buffer.from(restoredTx.serialize()).toString('hex') ;

  return signedTx;
}
