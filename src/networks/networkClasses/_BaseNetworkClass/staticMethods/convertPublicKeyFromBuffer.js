// for old C2 localStorage with Buffer publicKey
export default function(bufferPublicKey) {
  return bufferPublicKey.toString('hex')
}
