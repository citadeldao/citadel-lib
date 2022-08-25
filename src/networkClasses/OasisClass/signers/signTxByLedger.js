import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import OasisApp from '@oasisprotocol/ledger'
import { generateContext, u8FromBuf, bufFromU8 } from './functions'
import { getHdDerivationPath } from '../../_functions/ledger'

export const signTxByLedger = async (rawTransaction, derivationPath, publicKey) => {
  const transport = await TransportWebUSB.create(1000)
  const app = new OasisApp(transport)
  const context = await generateContext()
  const HDDerPath = getHdDerivationPath(derivationPath)
  const response = await app.sign( HDDerPath, context, bufFromU8(rawTransaction))
  if (!response.signature || response.return_code !== 0x9000) {
    const error = new Error(response.error_message)
    error.code = response.return_code
    throw error
  }
  await transport.close()
  
  return {
    untrusted_raw_value: rawTransaction,
    signature: {
        public_key: u8FromBuf(Buffer.from(publicKey,  'hex')),
        signature:  u8FromBuf(response.signature),
    },
};
}


// 436917
// 44/474/0/0/0
// oasis1qqm7wfqr2y227esu2wnl59t4wnplh04hcgz84230
//node  oasis1qq3xrq0urs8qcffhvmhfhz4p0mu7ewc8rscnlwxe