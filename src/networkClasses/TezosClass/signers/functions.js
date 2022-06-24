export const signMessageByEd25519 = async (msg, privateKey) => {
  // dynamic import of large module (for fast init)
  const { default: sodiumsumo } = await import('libsodium-wrappers-sumo')
  return Buffer.from(
    sodiumsumo.crypto_sign_detached(msg, Buffer.from(privateKey))
  ).toString('hex')
}
