export const createMessageSignatureByPrivateKey = async (data, privateKey) => {
  const { default: cosmos } = await import('cosmos-lib')
  privateKey = privateKey.replace('0x', '')
  const signature = cosmos.crypto.signJson(data, Buffer.from(privateKey, 'hex'))
  return signature.toString('hex')
}
