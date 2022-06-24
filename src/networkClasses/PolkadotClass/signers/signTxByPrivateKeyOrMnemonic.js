export const signTxByPrivateKeyOrMnemonic = async (
  rawTransaction,
  privateKeyOrMnemonic
) => {
  // dynamic import of large module (for fast init)
  const { Keyring } = await import('@polkadot/api')
  const { TypeRegistry } = await import('@polkadot/types')
  const { Metadata } = await import('@polkadot/types/metadata')
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
