import bs58check from 'bs58check'
import BN from 'bn.js'

// functions wich reused in some signers
export const base58checkEncode = (prefix, payload) => {
  const n = new Uint8Array(prefix.length + payload.length)
  n.set(prefix)
  n.set(payload, prefix.length)

  return bs58check.encode(Buffer.from(n))
}

export function base58CheckDecode(prefix, encoded) {
  return bs58check.decode(encoded).slice(prefix.length)
}

export function splitPath(path) {
  const result = []
  const components = path.split('/')
  components.forEach((element) => {
    let number = parseInt(element, 10)
    if (isNaN(number)) {
      return
    }
    if (element.length > 1 && element[element.length - 1] === `'`) {
      number += 0x80000000
    }
    result.push(number)
  })

  return result
}

function _padTo32(msg) {
  while (msg.length < 32) {
    msg = Buffer.concat([new Buffer([0]), msg])
  }
  if (msg.length !== 32) {
    throw new Error(`invalid key length: ${msg.length}`)
  }
  return msg
}

export const bip32PublicToEthereumPublic = async (pubKey) => {
  const { default: elliptic } = await import('elliptic')
  const ec = elliptic.ec('secp256k1')

  const key = ec.keyFromPublic(pubKey).getPublic().toJSON()
  return Buffer.concat([
    _padTo32(Buffer.from(key[0].toArray())),
    _padTo32(Buffer.from(key[1].toArray())),
  ])
}

export const toHexNumber = (value) => {
  if (typeof value === 'string' && value.startsWith('0x')) {
    return value
  }

  return `0x${new BN(value).toString(16)}`
}
