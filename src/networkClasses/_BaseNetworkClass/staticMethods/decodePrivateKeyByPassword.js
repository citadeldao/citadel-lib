// by default return decrypted string
export const decodePrivateKeyByPassword = async function (
  encodedPrivateKey,
  password
) {
  // dynamic import of large module (for fast init)
  const { default: CryptoJS } = await import('crypto-js')
  return CryptoJS.AES.decrypt(encodedPrivateKey, password).toString(
    CryptoJS.enc.Utf8
  )
}
