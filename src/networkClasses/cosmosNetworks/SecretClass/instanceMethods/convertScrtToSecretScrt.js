export async function convertScrtToSecretScrt({
  privateKey,
  derivationPath,
  amount,
  fee,
}) {
  // dynamic import module with huge npm package
  const { default: snip20Manager } = await import('../snip20Manager')
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
