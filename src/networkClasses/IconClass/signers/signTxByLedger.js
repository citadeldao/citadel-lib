import { generateHashKey, toRawTransaction } from './functions'
import { IconApp, ledgerErrorHandler } from '../ledgerApp'
import { getLedgerTransport } from "../../../ledgerTransportProvider";

export const signTxByLedger = async (rawTransaction, derivationPath, rightApp, transportType) => {
  // add global ledger app to avoid ledger reconnect error
  let transport = null
  if (!global.ledger_icon) {
    transport = await getLedgerTransport(transportType)
    global.ledger_icon = new IconApp(transport)
  }
  let res
  let rawTx
  try{
    // generate address and public key
    rawTx = await toRawTransaction(rawTransaction)
    const phraseToSign = generateHashKey(rawTx)
    res = await global.ledger_icon.signTransaction(
      derivationPath,
      phraseToSign
    )
  }catch(error){
    ledgerErrorHandler({ error, rightApp })
  }finally{
    if(global.ledger_icon) global.ledger_icon = null
    if(transport) await transport.close()
  }
  

  return { ...rawTx, signature: res.signedRawTxBase64 }
}
