import sodiumsumo from 'libsodium-wrappers-sumo'
import { base58checkEncode } from '../../_functions/crypto'

export const genAddress = async (publicKey) => {
  await sodiumsumo.ready
  const sodium_hash = sodiumsumo.crypto_generichash(14, publicKey)
  const pkh = base58checkEncode(Buffer.from([10, 4, 23]), sodium_hash)
  return (pkh.slice(0, 7) + pkh.slice(-4)).toLowerCase()
}
