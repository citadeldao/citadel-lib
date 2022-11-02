export const decodeMnemonic = async (encodeMnemonic, password) => {
  // dynamic import of large module (for fast init)
  const { default: CryptoJS } = await import('crypto-js')

  return CryptoJS.AES.decrypt(encodeMnemonic, password).toString(
    CryptoJS.enc.Utf8
  )
}
