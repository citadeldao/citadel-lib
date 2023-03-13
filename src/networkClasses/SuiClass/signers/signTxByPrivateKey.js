export const signTxByPrivateKey = async (rawTransaction, privateKey) => {
  const { 
    Ed25519Keypair,
    RawSigner,
    messageWithIntent,
    IntentScope,
    /*fromSerializedSignature*/
  } = await import('@mysten/sui.js');
  const { fromB64, fromHEX } = await import('@mysten/bcs');

  const keypair = Ed25519Keypair.fromSecretKey(fromHEX(privateKey));
  const signData = rawTransaction.bytes;
  const signer = new RawSigner(keypair);
  const intentMessage = messageWithIntent(IntentScope.TransactionData, fromB64(signData));
  const serializedSignature = await signer.signData(intentMessage);

  // let { signature, pubKey } = fromSerializedSignature(serializedSignature);
  // const { default: nacl } = await import('tweetnacl');
  // const isValid = nacl.sign.detached.verify(
  //     intentMessage,
  //     signature,
  //     pubKey.toBytes(),
  // );
  // console.log(isValid);

  return {
    tx: signData,
    signature: serializedSignature
  }
}