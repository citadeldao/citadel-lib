export const encodeMnemonic = async (mnemonic, password) => {
  // dynamic import of large module (for fast init)
  const { default: CryptoJS } = await import('crypto-js')
  return CryptoJS.AES.encrypt(mnemonic, password).toString()
}
