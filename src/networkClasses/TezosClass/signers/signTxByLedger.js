import { TezApp, ledgerErrorHandler } from '../ledgerApp'
// import { debugConsole } from '../../../helpers/debugConsole'
import { getLedgerTransport } from "../../../ledgerTransportProvider";

export const signTxByLedger = async (rawTransaction, derivationPath, rightApp, transportType) => {
  // add globa ledger app to avoid ledger reconnect error
  let transport
  if (!global.ledger_tez) {
    transport = await getLedgerTransport(transportType)
    global.ledger_tez = new TezApp(transport)
  }

  const { opbytes } = rawTransaction

  try {
    const { signature } = await global.ledger_tez.signOperation(
      derivationPath,
      `03${opbytes}`
    )

    return { sopbytes: opbytes + signature }
  } catch(error){
    ledgerErrorHandler({ error, rightApp})
  }finally{
    if(global.ledger_tez) global.ledger_tez = null
    if(transport) await transport.close()
  }
}
