import PolkadotLedger from '@ledgerhq/hw-app-polkadot'
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import U2fTransport from '@ledgerhq/hw-transport-u2f'
import errors from '../../../errors'

export const signTxByLedger = async (
  rawTransaction,
  derivationPath,
  address
) => {
  if (!global.ledger_polkadot) {
    const transport = (await WebHidTransport.isSupported())
      ? await WebHidTransport.create(10000)
      : await U2fTransport.create(10000)
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
  const response = await global.ledger_polkadot.sign(
    derivationPath,
    signingPayloadU8a
  )

  if (!response.signature) {
    errors.throwError('LedgerError', {
      message: response.error_message,
      code: response.return_code,
    })
  }
  // dynamic import of large module (for fast init)
  const { u8aToHex } = await import('@polkadot/util')

  return {
    signer: address,
    unsignedTx: rawTransaction.transaction,
    payload: payload.toHex(),
    signature: u8aToHex(response.signature),
  }
}
