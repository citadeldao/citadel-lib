import { getLedgerTransport } from "../../../ledgerTransportProvider";

export const signTxByLedger = async (rawTransaction, derivationPath/* , publicKey, rightApp */) => {
  const transport = await getLedgerTransport()
  const { default: SuiApp } = await import('@mysten/ledgerjs-hw-app-sui')
  // const { 
  //   Ed25519Keypair,
  //   RawSigner,
  //   messageWithIntent,
  //   IntentScope,
  //   toSerializedSignature
  //   /*fromSerializedSignature*/
  // } = await import('@mysten/sui.js');
  // const { fromB64, fromHEX } = await import('@mysten/bcs');
  const suiApp = new SuiApp(transport)
  const res = await suiApp.signTransaction(derivationPath, rawTransaction);
  console.log('test111',res);

  // const keypair = Ed25519Keypair.fromSecretKey(fromHEX(privateKey));
  const signData = rawTransaction.bytes;
  // const signer = new RawSigner(keypair);
  // const intentMessage = messageWithIntent(IntentScope.TransactionData, fromB64(signData));
  // const serializedSignature = await signer.signData(intentMessage);

  
// const pubKey = await this.getPublicKey();
// return toSerializedSignature({
//     signature,
//     signatureScheme: this.#signatureScheme,
//     pubKey,
// });

  return {
    tx: signData,
    signature: res.signature/* : serializedSignature */
  }
}
