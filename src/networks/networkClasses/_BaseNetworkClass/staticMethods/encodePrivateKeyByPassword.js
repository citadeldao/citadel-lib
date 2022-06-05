import CryptoJS from 'crypto-js'

export default function(privateKey, password) {
  return CryptoJS.AES.encrypt(privateKey, password).toString()
}
