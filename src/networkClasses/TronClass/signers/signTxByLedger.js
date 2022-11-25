import Trx from "@ledgerhq/hw-app-trx";
import {getLedgerTransport} from "../../../ledgerTransportProvider";

export const signTxByLedger = async (rawTransaction, derivationPath) => {
  const transport = await getLedgerTransport()

  const tronApp = new Trx(transport)
  const signature = await tronApp.signTransaction(derivationPath, rawTransaction.raw_data_hex)
  await transport.close()

  return {
    ...rawTransaction,
    signature: [signature],
};
}
