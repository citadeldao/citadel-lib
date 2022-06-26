import CosmosApp from 'ledger-cosmos-js'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { getHdDerivationPath } from '../../../_functions/ledger'

export const signTxByLedger_2 = async (
  rawTransaction,
  derivationPath,
  publicKey,
  modeType = 'sync'
) => {
  const transport = await TransportWebUSB.create(1000)
  const cosmosApp = new CosmosApp(transport)
  const hdPath = getHdDerivationPath(derivationPath)
  const response = await cosmosApp.sign(
    hdPath,
    JSON.stringify(rawTransaction.json)
  )

  if (!response.signature || response.return_code !== 0x9000) {
    const error = new Error(response.error_message)
    error.code = response.return_code
    throw error
  }
  await transport.close()
  // dynamic import for guge module
  const { default: secp256k1 } = await import('secp256k1')
  const parsedSignature = secp256k1.signatureImport(response.signature)

  let signMessage = new Object()
  if (
    rawTransaction.json.msgs[0].type === 'irishub/bank/Send' ||
    rawTransaction.json.msgs[0].type === 'irishub/stake/BeginUnbonding' ||
    rawTransaction.json.msgs[0].type === 'irishub/stake/BeginRedelegate'
  ) {
    signMessage = rawTransaction.jsonForSigningIrisTx
  } else {
    signMessage = rawTransaction.json
  }

  const signatureParsed = Buffer.from(parsedSignature).toString('hex')
  // const signMessage = rawTransaction.json
  const signedTx = {
    ...signMessage,
    fee: rawTransaction.json.fee,
    signature: signatureParsed,
    publicKey,
    memo: rawTransaction.json.memo,
    mode: modeType,
  }

  return signedTx
}
