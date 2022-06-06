import CryptoJS from 'crypto-js'

// by default encode string with AES
export const encodePrivateKeyByPassword = function (privateKey, password) {
  return CryptoJS.AES.encrypt(privateKey, password).toString()
}
