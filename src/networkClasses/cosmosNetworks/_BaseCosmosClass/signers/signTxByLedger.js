import { getHdDerivationPath } from '../../../_functions/ledger'
import { getLedgerTransport } from "../../../../ledgerTransportProvider";
import { ledgerErrorHandler } from "./../functions"

export const signTxByLedger = async (
  rawTransaction,
  derivationPath,
  publicKey,
  modeType = 'sync',
  rightApp
) => {
  const { default: CosmosApp } = await import('ledger-cosmos-js')
  const transport = await getLedgerTransport()
  const cosmosApp = new CosmosApp(transport)
  const hdPath = getHdDerivationPath(derivationPath)
  const resp = await cosmosApp.sign(
    hdPath,
    JSON.stringify(rawTransaction.json)
  )
  if (!resp.signature) {
    const appInfo = await cosmosApp.appInfo()
    await transport.close()
    ledgerErrorHandler({ appInfo, resp, rightApp })
  }
  await transport.close()
  // dynamic import for guge module
  const { default: secp256k1 } = await import('secp256k1')
  const parsedSignature = secp256k1.signatureImport(resp.signature)

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
