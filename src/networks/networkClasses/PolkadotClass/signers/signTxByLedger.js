import PolkadotLedger from '@ledgerhq/hw-app-polkadot'
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import U2fTransport from '@ledgerhq/hw-transport-u2f'
import { u8aToHex } from '@polkadot/util'
import errors from '../../../../errors'
const { TypeRegistry } = require('@polkadot/types')
const { Metadata } = require('@polkadot/types/metadata')

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
  const registry = new TypeRegistry()
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

  return {
    signer: address,
    unsignedTx: rawTransaction.transaction,
    payload: payload.toHex(),
    signature: u8aToHex(response.signature),
  }
}
