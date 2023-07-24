import Trx from "@ledgerhq/hw-app-trx";
import { getLedgerTransport } from "../../../ledgerTransportProvider";
import { ledgerErrorHandler } from "./functions"

export const signTxByLedger = async (rawTransaction, derivationPath, rightApp, transportType) => {
  const transport = await getLedgerTransport(transportType)
  const tronApp = new Trx(transport)
  let signature
  try{
    signature = await tronApp.signTransaction(derivationPath, rawTransaction.raw_data_hex)
  }catch(error){
    ledgerErrorHandler({ error, rightApp })
  }finally{
    if(transport) await transport.close()
  }
  
  return {
    ...rawTransaction,
    signature: [signature],
};
}
