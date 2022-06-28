import CosmosApp from 'ledger-cosmos-js'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { getHdDerivationPath } from '../../../_functions/ledger'
const secp256k1 = require('secp256k1')

// ledger signer (alternative version for some cosmos neworks)
export const createMessageSignatureByLedger_2 = async (
  data,
  derivationPath,
  stringifyData
) => {
  const transport = await TransportWebUSB.create(1000)
  const cosmosApp = new CosmosApp(transport)
  const response = await cosmosApp.sign(
    getHdDerivationPath(derivationPath),
    stringifyData ? JSON.stringify(data) : Buffer.from(JSON.stringify(data))
  )
  await transport.close()
  const parsedSignature = secp256k1.signatureImport(response.signature)

  return Buffer.from(parsedSignature).toString('hex')
}
