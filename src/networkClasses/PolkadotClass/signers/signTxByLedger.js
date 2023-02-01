import PolkadotLedger from '@ledgerhq/hw-app-polkadot'
// import errors from '../../../errors'
import { getLedgerTransport } from "../../../ledgerTransportProvider";
import { ledgerErrorHandler } from "./functions"

export const signTxByLedger = async (
  rawTransaction,
  derivationPath,
  address,
  rightApp
) => {
  let transport
  if (!global.ledger_polkadot) {
    transport = await getLedgerTransport()
    global.ledger_polkadot = new PolkadotLedger(transport)
  }
  // dynamic import of large module (for fast init)
  const { TypeRegistry } = await import('@polkadot/types')
  const registry = new TypeRegistry()
  // dynamic import of large module (for fast init)
  const { Metadata } = await import('@polkadot/types/metadata')
  const metadata = new Metadata(registry, rawTransaction.metadata)

  registry.setMetadata(metadata)

  const payload = registry.createType(
    'ExtrinsicPayload',
    rawTransaction.payload
  )
  const payloadU8a = payload.toU8a({ method: true })
  const signingPayloadU8a =
    payloadU8a.length > 256 ? registry.hash(payloadU8a) : payloadU8a
  
  let response
  try {
      response = await global.ledger_polkadot.sign(
      derivationPath,
      signingPayloadU8a
    )
  } catch (error) {
    // TODO: check correct error handling
    // const error = new Error(err.message)
    // error.code = err.statusCode
    // throw error
    ledgerErrorHandler({ error, rightApp })
  }finally{
    if(global.ledger_polkadot) global.ledger_polkadot = null
    if(transport) await transport.close()
  }
  

  // if (!response.signature) {
  //   errors.throwError('LedgerError', {
  //     message: response.error_message,
  //     code: response.return_code,
  //   })
  // }
  // dynamic import of large module (for fast init)
  const { u8aToHex } = await import('@polkadot/util')

  return {
    signer: address,
    unsignedTx: rawTransaction.transaction,
    payload: payload.toHex(),
    signature: u8aToHex(response.signature),
  }
}
