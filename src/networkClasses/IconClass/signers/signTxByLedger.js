import { generateHashKey, toRawTransaction } from './functions'
import { IconApp } from '../ledgerApp'
import {getLedgerTransport} from "../../../ledgerTransportProvider";

export const signTxByLedger = async (rawTransaction, derivationPath) => {
  // add global ledger app to avoid ledger reconnect error
  if (!global.ledger_icon) {
    const transport = await getLedgerTransport()
    global.ledger_icon = new IconApp(transport)
  }

  const rawTx = await toRawTransaction(rawTransaction)
  const phraseToSign = generateHashKey(rawTx)
  const { signedRawTxBase64 } = await global.ledger_icon.signTransaction(
    derivationPath,
    phraseToSign
  )

  return { ...rawTx, signature: signedRawTxBase64 }
}
