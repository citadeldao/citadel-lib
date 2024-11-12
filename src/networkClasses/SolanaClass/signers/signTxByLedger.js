import { getLedgerTransport } from "../../../ledgerTransportProvider";
import { ledgerErrorHandler } from "./functions"
const solanaWeb3 = require("@solana/web3.js");

export const signTxByLedger = async (rawTransaction, derivationPath, rightApp, transportType) => {
  const { default: SolanaApp } = await import('@ledgerhq/hw-app-solana');

  let transport
  if (!global.ledger_solana) {
    transport = await getLedgerTransport(transportType)
    global.ledger_solana = new SolanaApp(transport);
  }
  console.log('before sign info', derivationPath, rawTransaction);
  const tx = Buffer.from(rawTransaction.txs[0].tx, 'hex');
  const restoredTx = solanaWeb3.VersionedTransaction.deserialize(tx);
  const message = restoredTx.message.serialize();
  console.log('tx for sign 1', tx);
  console.log('tx for sign 2', message);

  try {
    const signed = await global.ledger_solana.signTransaction(derivationPath, message);
    console.log('after sign', signed);
    return Buffer.from(signed.signature).toString('hex');
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
