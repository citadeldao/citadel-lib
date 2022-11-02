// use for extension
export const hashMnemonic = async (mnemonic) => {
  // dynamic import of large module (for fast init)
  const { default: CryptoJS } = await import('crypto-js')
  if (mnemonic) {
    return CryptoJS.SHA256(mnemonic).toString()
  } else {
    return 'NO MNEMONIC'
  }
}
