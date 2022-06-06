import { ec as EC } from 'elliptic'
import {
  modifiedKeccak,
  trimLeadingZero,
  makeEven,
  inputCallFormatter,
  fromString,
  fromNat,
  toNumber,
  fromNumber,
  padBytes,
  encodeSignature,
  decodeSignature,
  rlpEncode,
  RLPDecode,
  RLPEncode,
} from './functions'

export const signTxByPrivateKey = (data, privateKey) => {
  privateKey = privateKey.replace('0x', '')
  return ethereumSigner(
    {
      ...data,
      chainId: data.chainId,
      gasPrice: data.gasPrice,
    },
    privateKey
  )
}

const signMessageBySecp256k1 = (msg, privateKey) => {
  const ellipticCurves = new EC('secp256k1')
  const keys = ellipticCurves.keyFromPrivate(privateKey)
  const signature = keys.sign(msg, { canonical: true })

  return {
    r: signature.r,
    s: signature.s,
    recoveryParam: signature.recoveryParam ? signature.recoveryParam : 0,
  }
}

const ethereumSigner = (tx, privateKey, applyKeccak = true) => {
  if (!tx.gas) {
    throw new Error('ETH: "gas" is missing')
  }

  if (
    tx.nonce < 0 ||
    tx.gas < 0 ||
    parseInt(tx.gasPrice) < 0 ||
    tx.chainId < 0
  ) {
    throw new Error('Gas, gasPrice, nonce or chainId is lower than 0')
  }

  const txFormatted = inputCallFormatter({ ...tx })

  const formatted = {
    ...txFormatted,
    to: txFormatted.to || '0x',
    data: txFormatted.data || '0x',
    value: txFormatted.value || '0x',
    chainId: fromNumber(txFormatted.chainId),
  }

  const makeSigner = (hash, addToV = 0) => {
    const signature = signMessageBySecp256k1(
      Buffer.from(hash.slice(2), 'hex'),
      privateKey
    )
    return encodeSignature([
      fromString(fromNumber(addToV + signature.recoveryParam)),
      padBytes(32, fromNat('0x' + signature.r.toString(16))),
      padBytes(32, fromNat('0x' + signature.s.toString(16))),
    ])
  }

  const data = rlpEncode(formatted)
  const signature = applyKeccak
    ? makeSigner(modifiedKeccak(data), toNumber(formatted.chainId) * 2 + 35)
    : makeSigner(data)

  const rawTransaction = RLPDecode(data)
    .slice(0, 6)
    .concat(
      ...decodeSignature(signature).map((item) =>
        makeEven(trimLeadingZero(item))
      )
    )

  return RLPEncode(rawTransaction)
}
