import CryptoJS from 'crypto-js'

export default function(encodedPrivateKey, password) {
  return CryptoJS.AES.decrypt(encodedPrivateKey, password).toString(
    CryptoJS.enc.Utf8
  )
}
