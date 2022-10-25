// use for extension
import CryptoJS from 'crypto-js'

export const hashMnemonic = (mnemonic) => {
  if (mnemonic) {
    return CryptoJS.SHA256(mnemonic).toString()
  } else {
    return 'NO MNEMONIC'
  }
}
