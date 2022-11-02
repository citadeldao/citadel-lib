// by default encode string with AES
export const encodePrivateKeyByPassword = async function (
  privateKey,
  password
) {
  // dynamic import of large module (for fast init)
  const { default: CryptoJS } = await import('crypto-js')
  return CryptoJS.AES.encrypt(privateKey, password).toString()
}
