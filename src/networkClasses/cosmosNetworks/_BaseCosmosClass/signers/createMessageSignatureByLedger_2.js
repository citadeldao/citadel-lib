import { getHdDerivationPath } from '../../../_functions/ledger'
import {getLedgerTransport} from "../../../../ledgerTransportProvider";

// ledger signer (alternative version for some cosmos neworks)
export const createMessageSignatureByLedger_2 = async (
  data,
  derivationPath,
  stringifyData,
  transportType
) => {
  const { default: CosmosApp } = await import('ledger-cosmos-js')
  const transport = await getLedgerTransport(transportType)
  const cosmosApp = new CosmosApp(transport)
  const response = await cosmosApp.sign(
    getHdDerivationPath(derivationPath),
    stringifyData ? JSON.stringify(data) : Buffer.from(JSON.stringify(data))
  )
  await transport.close()
  // dynamic import for guge module
  const { default: secp256k1 } = await import('secp256k1')
  const parsedSignature = secp256k1.signatureImport(response.signature)

  return Buffer.from(parsedSignature).toString('hex')
}
