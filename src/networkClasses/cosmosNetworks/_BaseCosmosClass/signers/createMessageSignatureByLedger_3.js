import CosmosApp from 'ledger-cosmos-js'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { getHdDerivationPath } from '../../../_functions/ledger'

export const createMessageSignatureByLedger_3 = async (
  data,
  derivationPath
) => {
  const transport = await TransportWebUSB.create(1000)
  const cosmosApp = new CosmosApp(transport)

  const response = await cosmosApp.sign(
    getHdDerivationPath(derivationPath),
    JSON.stringify(data)
  )
  await transport.close()

  // dynamic import for guge module
  const { default: secp256k1 } = await import('secp256k1')
  const parsedSignature = secp256k1.signatureImport(response.signature)

  return Buffer.from(parsedSignature).toString('hex')
}
