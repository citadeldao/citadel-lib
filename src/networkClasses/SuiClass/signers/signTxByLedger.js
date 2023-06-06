import { getLedgerTransport } from "../../../ledgerTransportProvider";
import { ledgerErrorHandler } from './functions'

export const signTxByLedger = async (rawTransaction, derivationPath, publicKey, rightApp) => {
  const { default: SuiApp } = await import('@mysten/ledgerjs-hw-app-sui')
  const {
    messageWithIntent,
    IntentScope,
    toSerializedSignature,
    publicKeyFromSerialized
  } = await import('@mysten/sui.js');
  const { fromB64 } = await import('@mysten/bcs');

  const transport = await getLedgerTransport()
  const suiApp = new SuiApp(transport)
  const signData = rawTransaction.bytes || rawTransaction;
  const intentMessage = messageWithIntent(IntentScope.TransactionData, fromB64(signData));
  let res
  try{
    res = await suiApp.signTransaction(derivationPath, intentMessage);
  }catch(error){
    ledgerErrorHandler({ error, rightApp })
  }finally{
    if(transport) await transport.close()
  }
  const suiPubKey = publicKeyFromSerialized('ED25519',Buffer.from(publicKey, 'hex').toString('base64'))
  const serializedSignature = toSerializedSignature({
    signature: res.signature,
    signatureScheme: 'ED25519',
    pubKey: suiPubKey,
});

  return {
    tx: signData,
    signature: serializedSignature
  }
}
