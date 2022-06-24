import { base58checkEncode } from '../../_functions/crypto'

export const genAddress = async (publicKey) => {
  // dynamic import of large module (for fast init)
  const { default: sodiumsumo } = await import('libsodium-wrappers-sumo')

  await sodiumsumo.ready
  const sodium_hash = sodiumsumo.crypto_generichash(14, publicKey)
  const pkh = base58checkEncode(Buffer.from([10, 4, 23]), sodium_hash)
  return (pkh.slice(0, 7) + pkh.slice(-4)).toLowerCase()
}
