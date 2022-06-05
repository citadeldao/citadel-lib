import { keccak256 } from 'js-sha3'
import BN from 'bn.js'
import { RLPEncode, RLPDecode } from '../functions/rlp'

export const modifiedKeccak = (str) => {
  let msg
  if (str.slice(0, 2) === '0x') {
    msg = []
    for (let i = 2, l = str.length; i < l; i += 2)
      msg.push(parseInt(str.slice(i, i + 2), 16))
  } else {
    msg = str
  }
  return '0x' + keccak256(msg)
}

export const trimLeadingZero = (hex) => {
  while (hex && hex.startsWith('0x0')) {
    hex = '0x' + hex.slice(3)
  }
  return hex
}

export const makeEven = (hex) => {
  if (hex.length % 2 === 1) {
    hex = hex.replace('0x', '0x0')
  }
  return hex
}

export const inputCallFormatter = (options) => {
  options.to = options.to.toLowerCase()
  return txInputFormatter(options)
}
const txInputFormatter = (options) => {
  return {
    ...options,
    gasPrice: options.gasPrice && formatToHex(options.gasPrice),
    gas: (options.gas && formatToHex(options.gas)) || '0x',
    value: (options.value && options.value.toString()) || '0x',
    nonce: (options.nonce && formatToHex(options.nonce)) || '0x',
  }
}
const formatToHex = (num) => {
  const bn = new BN(num)
  const result = bn.toString(16)
  return bn.lt(new BN(0)) ? '-0x' + result.substr(1) : '0x' + result
}

export const fromString = (str) => {
  const bn =
    '0x' +
    (str.slice(0, 2) === '0x'
      ? new BN(str.slice(2), 16)
      : new BN(str, 10)
    ).toString('hex')
  return bn === '0x0' ? '0x' : bn
}

export const fromNat = (bn) =>
  bn === '0x0' ? '0x' : bn.length % 2 === 0 ? bn : '0x0' + bn.slice(2)
const toBN = (str) => new BN(str.slice(2), 16)

export const toNumber = (a) => toBN(a).toNumber()

export const fromNumber = (num) => {
  const hex = num.toString(16)
  return hex.length % 2 === 0 ? '0x' + hex : '0x0' + hex
}

export const padBytes = (l, hex) =>
  hex.length === l * 2 + 2 ? hex : padBytes(l, '0x' + '0' + hex.slice(2))

const flattenBytes = (a) => '0x' + a.reduce((r, s) => r + s.slice(2), '')
export const encodeSignature = ([v, r, s]) => flattenBytes([r, s, v])

const slice = (i, j, bs) => '0x' + bs.slice(i * 2 + 2, j * 2 + 2)
export const decodeSignature = (signature) => [
  slice(64, (signature.length - 2) / 2, signature),
  slice(0, 32, signature),
  slice(32, 64, signature),
]

export const rlpEncode = (tx) => {
  return RLPEncode([
    fromNat(tx.nonce),
    fromNat(tx.gasPrice),
    fromNat(tx.gas),
    tx.to.toLowerCase(),
    fromNat(tx.value),
    tx.data,
    fromNat(tx.chainId || '0x1'),
    '0x',
    '0x',
  ])
}

export const ethereumHardwareSigner = async (
  tx,
  signFunction,
  applyKeccak = true
) => {
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

  const makeHardwareSigner = async (hash, signFunction, addToV = 0) => {
    const signature = await signFunction(Buffer.from(hash.slice(2), 'hex'))

    return encodeSignature([
      fromString(fromNumber(addToV + signature.recoveryParam)),
      padBytes(32, fromNat(`0x${signature.r.toString(16)}`)),
      padBytes(32, fromNat(`0x${signature.s.toString(16)}`)),
    ])
  }

  const data = rlpEncode(formatted)
  const signature = applyKeccak
    ? await makeHardwareSigner(
        modifiedKeccak(data),
        signFunction,
        toNumber(formatted.chainId) * 2 + 35
      )
    : await makeHardwareSigner(data, signFunction)

  const rawTransaction = RLPDecode(data)
    .slice(0, 6)
    .concat(
      ...decodeSignature(signature).map((item) =>
        makeEven(trimLeadingZero(item))
      )
    )

  return RLPEncode(rawTransaction)
}
