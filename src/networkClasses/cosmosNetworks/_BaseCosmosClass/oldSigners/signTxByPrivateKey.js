import { sortObject } from '../functions'

// ecpariPriv: Buffer(32)
export const signTxByPrivateKey = async (
  stdSignMsg,
  privateKey,
  modeType = 'sync'
) => {
  // dynamic import of large module (for fast init)
  const { ECPair } = await import('bitcoinjs-lib')
  privateKey = privateKey.replace('0x', '')
  const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'))

  // dynamic import for guge module
  const { default: secp256k1 } = await import('secp256k1')

  function getPubKeyBase64(ecpairPriv) {
    const pubKeyByte = secp256k1.publicKeyCreate(ecpairPriv)
    return Buffer.from(pubKeyByte, 'binary').toString('base64')
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

  // dynamic import of large module (for fast init)
  const { default: crypto } = await import('crypto')

  const hash = crypto
    .createHash('sha256')
    .update(JSON.stringify(sortObject(signMessage)))
    .digest('hex')
  const buf = Buffer.from(hash, 'hex')
  let signObj = secp256k1.ecdsaSign(buf, keyPair.privateKey)
  var signatureBase64 = Buffer.from(signObj.signature, 'binary').toString(
    'base64'
  )
  const value = await getPubKeyBase64(keyPair.privateKey)
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
            value,
          },
        },
      ],
      memo: stdSignMsg.json.memo,
    },
    mode: modeType,
  }
  return signedTx
}
