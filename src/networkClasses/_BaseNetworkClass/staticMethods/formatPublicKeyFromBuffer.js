import { getType } from '../../../helpers/checkArguments'

// for old C2 localStorage with Buffer publicKey
export const formatPublicKeyFromBuffer = function (publicKey) {
  // convert to hex string if Buffer or Object
  if (publicKey instanceof Buffer) {
    return publicKey.toString('hex')
  }

  if (getType(publicKey) === 'Object') {
    return Buffer.from(publicKey).toString('hex')
  }

  // do not format publicKey if not Buffer or Object
  return publicKey
}
