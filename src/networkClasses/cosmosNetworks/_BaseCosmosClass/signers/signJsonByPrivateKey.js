// import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing'
// const secp256k1 = require('secp256k1')
const cosmos_lib = require('cosmos-lib')
// import { OfflineAminoSigner } from '@cosmjs/amino'

// // TODO: refact repeated functions
// const sortedObject = (obj) => {
//   if (typeof obj !== 'object' || obj === null) {
//     return obj
//   }
//   if (Array.isArray(obj)) {
//     return obj.map(sortedObject)
//   }
//   const sortedKeys = Object.keys(obj).sort()
//   const result = {}
//   // NOTE: Use forEach instead of reduce for performance with large objects eg Wasm code
//   sortedKeys.forEach((key) => {
//     result[key] = sortedObject(obj[key])
//   })
//   return result
// }

// const sortedJsonStringify = (obj) => {
//   return JSON.stringify(sortedObject(obj))
// }

// const toUtf8 = (str) => {
//   return new TextEncoder().encode(str)
// }

// const serializeSignDoc = (signDoc) => {
//   return toUtf8(sortedJsonStringify(signDoc))
// }

export const signJsonByPrivateKey = async (
  transaction,
  privateKey,
  publicKey
  // address
) => {
  console.log({ transaction, privateKey, publicKey })
  privateKey = privateKey.replace('0x', '')

  const signature = cosmos_lib.crypto.signJson(
    transaction.json,
    Buffer.from(privateKey, 'hex')
  )

  // // create signer wallet by privateKey
  // const wallet = await DirectSecp256k1Wallet.fromKey(
  //   Buffer.from(privateKey, 'hex'),
  //   'cosmos'
  // )

  // console.log('>>> transaction', transaction)

  // const message = serializeSignDoc(transaction.json)
  // const formattedMessage = new TextDecoder('utf-8', {
  //   fatal: true,
  // }).decode(message)

  // console.log('>>> formattedMessage', formattedMessage)

  // const { signature: { signature } = {} } = await wallet.signDirect(
  //   address,
  //   serializeSignDoc(formattedMessage)
  // )

  return {
    ...transaction.json,
    publicKey,
    signature: signature.toString('hex'),
  }
}
