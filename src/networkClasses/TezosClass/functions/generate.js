const sodiumsumo = require('libsodium-wrappers-sumo')
const { derivePath } = require('ed25519-hd-key')

async function keys(mnemonicEncoded, passphrase, path) {
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
  await sodiumsumo.ready
  const seed = sodiumsumo.crypto_sign_ed25519_sk_to_seed(sk)
  return sodiumsumo.crypto_sign_seed_keypair(seed, '')
}

export const TezosOneseed = { keys, publickey }
