import { TezApp } from '../ledgerApp'
import { debugConsole } from '../../../helpers/debugConsole'
import {getLedgerTransport} from "../../../ledgerTransportProvider";

export const signTxByLedger = async (rawTransaction, derivationPath) => {
  // add globa ledger app to avoid ledger reconnect error
  if (!global.ledger_tez) {
    const transport = await getLedgerTransport()
    global.ledger_tez = new TezApp(transport)
  }

  const { opbytes } = rawTransaction

  try {
    const { signature } = await global.ledger_tez.signOperation(
      derivationPath,
      `03${opbytes}`
    )

    return { sopbytes: opbytes + signature }
  } catch (err) {
    debugConsole.error(err)
  }
}
