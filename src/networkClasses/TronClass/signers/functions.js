import { LEDGER_ERRORS, ERROR_CODES } from '../../../constants'
import errors from '../../../errors'

export async function getPubKeyFromPriKey(priKeyBytes) {
  const { default: elliptic } = await import('elliptic')
  const ec = new elliptic.ec('secp256k1')
  const key = ec.keyFromPrivate(priKeyBytes, 'bytes')
  const pubkey = key.getPublic()
  const x = pubkey.x
  const y = pubkey.y

  let xHex = x.toString('hex')

  while (xHex.length < 64) {
    xHex = `0${xHex}`
  }

  let yHex = y.toString('hex')

  while (yHex.length < 64) {
    yHex = `0${yHex}`
  }

  const pubkeyHex = `04${xHex}${yHex}`
  const pubkeyBytes = hexStr2byteArray(pubkeyHex)

  return pubkeyBytes
}

export function hexStr2byteArray(str, strict = false) {
  if (typeof str !== 'string')
    throw new Error('The passed string is not a string')

  let len = str.length

  if (strict) {
    if (len % 2) {
      str = `0${str}`
      len++
    }
  }
  const byteArray = Array()
  let d = 0
  let j = 0
  let k = 0

  for (let i = 0; i < len; i++) {
    const c = str.charAt(i)

    if (isHexChar(c)) {
      d <<= 4
      d += hexChar2byte(c)
      j++

      if (0 === j % 2) {
        byteArray[k++] = d
        d = 0
      }
    } else throw new Error('The passed hex char is not a valid hex string')
  }

  return byteArray
}

export function isHexChar(c) {
  if (
    (c >= 'A' && c <= 'F') ||
    (c >= 'a' && c <= 'f') ||
    (c >= '0' && c <= '9')
  ) {
    return 1
  }

  return 0
}

export function hexChar2byte(c) {
  let d

  if (c >= 'A' && c <= 'F') d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10
  else if (c >= 'a' && c <= 'f') d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10
  else if (c >= '0' && c <= '9') d = c.charCodeAt(0) - '0'.charCodeAt(0)

  if (typeof d === 'number') return d
  else throw new Error('The passed hex char is not a valid hex char')
}

export function ledgerErrorHandler({ error, rightApp }) {
    if(LEDGER_ERRORS.TRON.REJECT_ERROR_CODES.includes(+error.statusCode)){
      errors.throwError('LedgerError', {
        message: error.error_message,
        code: ERROR_CODES.LEDGER.REJECT_CODE,
      })
    }
    if(LEDGER_ERRORS.TRON.WRONG_APP_CODES.includes(+error.statusCode)){
      errors.throwError('LedgerError', {
        message: error.error_message,
        code: ERROR_CODES.LEDGER.WRONG_APP,
        data: {
          rightApp: rightApp[0]
        }
      })
    }else{
      errors.throwError('LedgerError', {
        message: error.error_message,
        code: ERROR_CODES.UNKNOWN_ERROR,
      })
    }
  }
