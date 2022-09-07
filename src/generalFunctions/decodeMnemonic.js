import CryptoJS from 'crypto-js'

export const decodeMnemonic = (encodeMnemonic, password) => {
  return CryptoJS.AES.decrypt(encodeMnemonic, password).toString(
    CryptoJS.enc.Utf8
  )
}
