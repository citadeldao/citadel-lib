import OasisApp from '@oasisprotocol/ledger'
import { generateContext, u8FromBuf, bufFromU8, ledgerErrorHandler } from './functions'
import { getHdDerivationPath } from '../../_functions/ledger'
import { getLedgerTransport } from "../../../ledgerTransportProvider";

export const signTxByLedger = async (rawTransaction, derivationPath, publicKey, rightApp) => {
  const transport = await getLedgerTransport()
  const oasisApp = new OasisApp(transport)
  const context = await generateContext()
  const HDDerPath = getHdDerivationPath(derivationPath)
  const resp = await oasisApp.sign( HDDerPath, context, bufFromU8(rawTransaction))
  if (!resp.signature) {
    if (!resp.signature) {
      const appInfo = await oasisApp.appInfo()
      await transport.close()
      ledgerErrorHandler({ appInfo, resp, rightApp })
    }
  }
  await transport.close()

  return {
    untrusted_raw_value: rawTransaction,
    signature: {
        public_key: u8FromBuf(Buffer.from(publicKey,  'hex')),
        signature:  u8FromBuf(resp.signature),
    },
};
}


// 436917
// 44/474/0/0/0
// oasis1qqm7wfqr2y227esu2wnl59t4wnplh04hcgz84230
//node  oasis1qq3xrq0urs8qcffhvmhfhz4p0mu7ewc8rscnlwxe
