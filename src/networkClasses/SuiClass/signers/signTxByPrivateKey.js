export const signTxByPrivateKey = async (rawTransaction, privateKey) => {
  const { 
    Ed25519Keypair,
    RawSigner,
    messageWithIntent,
    IntentScope,
  } = await import('@mysten/sui.js');
  const { fromB64, fromHEX } = await import('@mysten/bcs');

  const keypair = Ed25519Keypair.fromSecretKey(fromHEX(privateKey));
  const signData = rawTransaction.bytes;
  const signer = new RawSigner(keypair);
  const intentMessage = messageWithIntent(IntentScope.TransactionData, fromB64(signData));
  const serializedSignature = await signer.signData(intentMessage);

  return {
    tx: signData,
    signature: serializedSignature
  }
}