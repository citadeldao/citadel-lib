import CryptoJS from 'crypto-js'

export const encodeMnemonic = (mnemonic, password) => {
  return CryptoJS.AES.encrypt(mnemonic, password).toString()
}
