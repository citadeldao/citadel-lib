import { Keyring } from '@polkadot/api'
const { TypeRegistry } = require('@polkadot/types')
const { Metadata } = require('@polkadot/types/metadata')

export const signTxByPrivateKeyOrMnemonic = (
  rawTransaction,
  privateKeyOrMnemonic
) => {
  // polka transfer
  const account = new Keyring({ type: 'sr25519', ss58Format: 0 }).addFromUri(
    privateKeyOrMnemonic
  )
  const registry = new TypeRegistry()
  const metadata = new Metadata(registry, rawTransaction.metadata)
  registry.setMetadata(metadata)
  const payload = registry.createType(
    'ExtrinsicPayload',
    rawTransaction.payload
  )
  const { signature } = payload.sign(account)

  return {
    signer: account.address,
    unsignedTx: rawTransaction.transaction,
    payload: payload.toHex(),
    signature,
  }
}
