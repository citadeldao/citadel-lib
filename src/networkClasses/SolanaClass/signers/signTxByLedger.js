import { getLedgerTransport } from "../../../ledgerTransportProvider";
import { ledgerErrorHandler } from "./functions"

export const signTxByLedger = async (rawTransaction, derivationPath, rightApp, transportType) => {
  const { default: SolanaApp } = await import('@ledgerhq/hw-app-solana');

  let transport
  if (!global.ledger_solana) {
    transport = await getLedgerTransport(transportType)
    global.ledger_solana = new SolanaApp(transport);
  }
  try {
    const signed = await global.ledger_solana.signTransaction(derivationPath, rawTransaction);
    return signed.signature;
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
