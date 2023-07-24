import { getHdDerivationPath } from '../../../_functions/ledger'
// import { getLedgerApp } from './getLedgerApp'
// import errors from '../../../../errors'
import { ledgerErrorHandler } from "./../functions"
import { getLedgerTransport } from "../../../../ledgerTransportProvider";


export const createMessageSignatureByLedger = async (data, derivationPath, rightApp, transportType) => {
  // const ledgerApp = await getLedgerApp()
  //const resp = await ledgerApp.cosmosApp.sign(hdPath, JSON.stringify(data))

  const { default: CosmosApp } = await import('ledger-cosmos-js')
  const transport = await getLedgerTransport(transportType)
  const cosmosApp = new CosmosApp(transport)
  const hdPath = getHdDerivationPath(derivationPath)
  const resp = await cosmosApp.sign(hdPath, JSON.stringify(data))
  // if (!response.signature) {
  //   errors.throwError('LedgerError', {
  //     message: response.error_message,
  //     code: response.return_code,
  //   })
  // }
  if (!resp.signature) {
    const appInfo = await cosmosApp.appInfo()
    await transport.close()
    ledgerErrorHandler({ appInfo, resp, rightApp })
  }
  await transport.close()
  // dynamic import for guge module
  const { default: secp256k1 } = await import('secp256k1')
  const parsedSignature = secp256k1.signatureImport(resp.signature)
  return Buffer.from(parsedSignature).toString('hex')
}
