import snip20Manager from '../snip20Manager'

export async function convertScrtToSecretScrt({
  privateKey,
  derivationPath,
  amount,
  fee,
}) {
  return await snip20Manager.convertScrtToSecretScrt({
    address: this.address,
    publicKey: this.publicKey,
    type: this.type,
    privateKey,
    derivationPath,
    amount,
    fee,
  })
}
