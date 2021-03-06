import CosmosApp from 'ledger-cosmos-js'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
const secp256k1 = require('secp256k1')
import { getHdDerivationPath } from '../../../_functions/ledger'

// ledger signer (alternative version for some cosmos neworks)
export const signTxByLedger_2 = async (
  rawTransaction,
  derivationPath,
  publicKey,
  modeType = 'sync'
) => {
  // TODO: check reconnect case
  const transport = await TransportWebUSB.create(1000)
  const cosmosApp = new CosmosApp(transport)
  const hdPath = getHdDerivationPath(derivationPath)
  const response = await cosmosApp.sign(hdPath, rawTransaction.bytes)

  if (!response.signature || response.return_code !== 0x9000) {
    const error = new Error(response.error_message)
    error.code = response.return_code
    throw error
  }
  await transport.close()
  const parsedSignature = secp256k1.signatureImport(response.signature)
  const signatureBase64 = Buffer.from(parsedSignature, 'binary').toString(
    'base64'
  )

  const signedTx = {
    tx: {
      msg: rawTransaction.json.msgs,
      fee: rawTransaction.json.fee,
      signatures: [
        {
          account_number: rawTransaction.json.account_number,
          sequence: rawTransaction.json.sequence,
          signature: signatureBase64,
          pub_key: {
            type: 'tendermint/PubKeySecp256k1',
            value: Buffer.from(publicKey, 'hex').toString('base64'),
          },
        },
      ],
      memo: rawTransaction.json.memo,
    },
    mode: modeType,
  }
  return signedTx
}
