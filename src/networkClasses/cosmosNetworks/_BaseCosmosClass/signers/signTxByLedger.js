import { getHdDerivationPath } from '../../../_functions/ledger'
import { getLedgerTransport } from "../../../../ledgerTransportProvider";
import { ledgerErrorHandler } from "./../functions"
import { sortObject } from '../functions'

export const signTxByLedger = async (
  rawTransaction,
  derivationPath,
  publicKey,
  modeType = 'sync',
  rightApp,
  transportType
) => {
  const { default: CosmosApp } = await import('ledger-cosmos-js')

  if (!global.transport) {
    const transport = await getLedgerTransport(transportType);
    global.transport = transport;
  }

  if (!global.cosmosApp) {
    const cosmosApp = new CosmosApp(global.transport)
    global.cosmosApp = cosmosApp;
  }

  const hdPath = getHdDerivationPath(derivationPath)
  
  // make stapshot of deafult tx
  const txSnapshot = JSON.parse(JSON.stringify(rawTransaction))
  // remove granter kay from tx
  if(rawTransaction.json?.fee?.granter) delete rawTransaction.json.fee.granter;

  const resp = await global.cosmosApp.sign(
    hdPath,
    JSON.stringify(sortObject(rawTransaction.json))
  )
  if (!resp.signature) {
    const appInfo = await global.cosmosApp.appInfo()
    if(transportType === 'usb'){
      // await global.transport.close()
    }
    ledgerErrorHandler({ appInfo, resp, rightApp })
  }
  if(transportType === 'usb'){
    // await global.transport.close()
  }
  // dynamic import for guge module
  const { default: secp256k1 } = await import('secp256k1')
  const parsedSignature = secp256k1.signatureImport(resp.signature)

  let signMessage = new Object()
  if (
    rawTransaction?.json?.msgs?.[0]?.type === 'irishub/bank/Send' ||
    rawTransaction?.json?.msgs?.[0]?.type === 'irishub/stake/BeginUnbonding' ||
    rawTransaction?.json?.msgs?.[0]?.type === 'irishub/stake/BeginRedelegate'
  ) {
    signMessage = rawTransaction.jsonForSigningIrisTx
  } else {
    signMessage = rawTransaction.json
  }

  const signatureParsed = Buffer.from(parsedSignature).toString('hex')
  // const signMessage = rawTransaction.json
  const signedTx = {
    ...signMessage,
    // get default tx fee key
    fee: txSnapshot.json.fee,
    signature: signatureParsed,
    publicKey,
    memo: rawTransaction.json.memo,
    mode: modeType,
  }

  return signedTx
}
