async function keys(mnemonicEncoded, passphrase, path) {
  // dynamic import of large module (for fast init)
  const { default: sodiumsumo } = await import('libsodium-wrappers-sumo')
  // dynamic import of large module (for fast init)
  const { derivePath } = await import('ed25519-hd-key')
  const seed = derivePath(path, mnemonicEncoded).key.slice(0, 32)
  await setTimeout(() => {})
  let keys = sodiumsumo.crypto_sign_seed_keypair(seed)

  return {
    passphrase,
    path,
    seed,
    ...keys,
  }
}

const publickey = async (sk) => {
  // dynamic import of large module (for fast init)
  const { default: sodiumsumo } = await import('libsodium-wrappers-sumo')
  await sodiumsumo.ready
  const seed = sodiumsumo.crypto_sign_ed25519_sk_to_seed(sk)
  return sodiumsumo.crypto_sign_seed_keypair(seed, '')
}

export const TezosOneseed = { keys, publickey }
