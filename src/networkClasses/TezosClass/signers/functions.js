const sodiumsumo = require('libsodium-wrappers-sumo')

export const signMessageByEd25519 = (msg, privateKey) => {
  return Buffer.from(
    sodiumsumo.crypto_sign_detached(msg, Buffer.from(privateKey))
  ).toString('hex')
}
