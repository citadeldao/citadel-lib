const cosmos_lib = require('cosmos-lib')

export const createMessageSignatureByPrivateKey = (data, privateKey) => {
  privateKey = privateKey.replace('0x', '')
  const signature = cosmos_lib.crypto.signJson(
    data,
    Buffer.from(privateKey, 'hex')
  )
  return signature.toString('hex')
}
