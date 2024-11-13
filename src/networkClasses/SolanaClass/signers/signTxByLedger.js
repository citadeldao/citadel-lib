import { getLedgerTransport } from "../../../ledgerTransportProvider";
import { ledgerErrorHandler } from "./functions"
const solanaWeb3 = require("@solana/web3.js");
const bs58 = require('bs58');

export const signTxByLedger = async (rawTransaction, derivationPath, rightApp, transportType) => {
  const { default: SolanaApp } = await import('@ledgerhq/hw-app-solana');

  let transport
  if (!global.ledger_solana) {
    transport = await getLedgerTransport(transportType)
    global.ledger_solana = new SolanaApp(transport);
  }
  const tx = Buffer.from(rawTransaction.txs[0].tx, 'hex');
  const restoredTx = solanaWeb3.VersionedTransaction.deserialize(tx);
  const message = restoredTx.message.serialize();

  try {
    const signed = await global.ledger_solana.signTransaction(derivationPath, message);
    const pubKey = new solanaWeb3.PublicKey(bs58.decode(rawTransaction.txs[0].address));
    
    restoredTx.addSignature(pubKey, signed.signature);
    const signedTx = Buffer.from(restoredTx.serialize()).toString('hex') ;
    return signedTx;

  }catch(error){
    console.log(error);
    ledgerErrorHandler({ error, rightApp })
  }finally{
    if(transportType === 'usb'){
      if(global.ledger_solana) global.ledger_solana = null
      if(transport) await transport.close()
    }
  }
  
}
