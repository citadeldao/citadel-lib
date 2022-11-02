import * as TezosUtil from './utils'

export const TezosPrefix = {
  tz1: Buffer.from([6, 161, 159]),
  tz2: Buffer.from([6, 161, 161]),
  tz3: Buffer.from([6, 161, 164]),
  kt: Buffer.from([2, 90, 121]),
  edpk: Buffer.from([13, 15, 37, 217]),
  edsk: Buffer.from([43, 246, 78, 7]),
  edsig: Buffer.from([9, 245, 205, 134, 18]),
  branch: Buffer.from([1, 52]),
  o: Buffer.from([5, 116]),
}

export const walletFromPrivate = async (edsk) => {
  // dynamic import of large module (for fast init)
  const { default: sodiumsumo } = await import('libsodium-wrappers-sumo')
  const publickey = async (sk) => {
    await sodiumsumo.ready
    const seed =
      sk.length === 32 ? sk : sodiumsumo.crypto_sign_ed25519_sk_to_seed(sk)
    return sodiumsumo.crypto_sign_seed_keypair(seed, '')
  }
  const privateKey = TezosUtil.writeKeyWithHint(edsk, 'edsk')
  const keys = await publickey(privateKey)

  return keys
}
