import { bech32 } from 'bech32'
import Ripemd160 from 'ripemd160'

// ledger helpers
export const getHdDerivationPath = (derivationPath = '') => {
  return derivationPath
    .split('/')
    .map((p) => parseInt(p))
    .filter((p) => !isNaN(p))
}

export const getBech32FromPK = async (prefix, publicKey) => {
  if (publicKey.length !== 33) {
    throw new Error('expected compressed public key [31 bytes]')
  }
  // dynamic import of large module (for fast init)
  const { default: crypto } = await import('crypto')

  const hashSha256 = crypto.createHash('sha256').update(publicKey).digest()
  const hashRip = new Ripemd160().update(hashSha256).digest()

  return bech32.encode(prefix, bech32.toWords(hashRip))
}

export async function foreach(arr, callback) {
  function iterate(index, array, result) {
    if (index >= array.length) {
      return result
    }

    return callback(array[index], index).then(function (res) {
      result.push(res)

      return iterate(index + 1, array, result)
    })
  }

  await Promise.resolve()
  return iterate(0, arr, [])
}

export function hexToBase64(hexString) {
  const match = hexString.match(/\w{2}/g)

  if (match) {
    return btoa(
      match
        .map(function (a) {
          return String.fromCharCode(parseInt(a, 16))
        })
        .join('')
    )
  }

  return ''
}
