import { ECPair } from 'bitcoinjs-lib'
const secp256k1 = require('secp256k1')
const crypto = require('crypto')

// ecpariPriv: Buffer(32)
export const signTxByPrivateKey = (
  stdSignMsg,
  privateKey,
  modeType = 'sync'
) => {
  privateKey = privateKey.replace('0x', '')
  const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'))

  function getPubKeyBase64(ecpairPriv) {
    const pubKeyByte = secp256k1.publicKeyCreate(ecpairPriv)
    return Buffer.from(pubKeyByte, 'binary').toString('base64')
  }

  function sortObject(obj) {
    if (obj === null) return null
    if (typeof obj !== 'object') return obj
    if (Array.isArray(obj)) return obj.map(sortObject)
    const sortedKeys = Object.keys(obj).sort()
    const result = {}
    sortedKeys.forEach((key) => {
      result[key] = sortObject(obj[key])
    })
    return result
  }

  let signMessage = new Object()
  if (
    stdSignMsg.json.msgs[0].type == 'irishub/bank/Send' ||
    stdSignMsg.json.msgs[0].type == 'irishub/stake/BeginUnbonding' ||
    stdSignMsg.json.msgs[0].type == 'irishub/stake/BeginRedelegate'
  ) {
    signMessage = stdSignMsg.jsonForSigningIrisTx
  } else {
    signMessage = stdSignMsg.json
  }
  const hash = crypto
    .createHash('sha256')
    .update(JSON.stringify(sortObject(signMessage)))
    .digest('hex')
  const buf = Buffer.from(hash, 'hex')
  let signObj = secp256k1.ecdsaSign(buf, keyPair.privateKey)
  var signatureBase64 = Buffer.from(signObj.signature, 'binary').toString(
    'base64'
  )

  const signedTx = {
    tx: {
      msg: stdSignMsg.json.msgs,
      fee: stdSignMsg.json.fee,
      signatures: [
        {
          account_number: stdSignMsg.json.account_number,
          sequence: stdSignMsg.json.sequence,
          signature: signatureBase64,
          pub_key: {
            type: 'tendermint/PubKeySecp256k1',
            value: getPubKeyBase64(keyPair.privateKey),
          },
        },
      ],
      memo: stdSignMsg.json.memo,
    },
    mode: modeType,
  }
  return signedTx
}
