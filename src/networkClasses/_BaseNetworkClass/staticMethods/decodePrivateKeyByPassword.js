import CryptoJS from 'crypto-js'

// by default return decrypted string
export const decodePrivateKeyByPassword = function (
  encodedPrivateKey,
  password
) {
  return CryptoJS.AES.decrypt(encodedPrivateKey, password).toString(
    CryptoJS.enc.Utf8
  )
}
