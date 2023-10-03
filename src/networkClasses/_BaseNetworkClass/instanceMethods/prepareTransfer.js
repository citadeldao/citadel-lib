import api from '../../../api'

// by default - proxy request to backend
export const prepareTransfer = async function (options) {
  let from = this.address;
  let publicKey = this.publicKey;

  if (options.btcAddressType) {
    if (options.btcAddressType === 'segwit') {
      from = this.segwitAddress;
      publicKey = this.publicKeySegwit;
    }
    if (options.btcAddressType === 'native') {
      from = this.nativeAddress;
      publicKey = this.publicKeyNative;
    }
  }

  const { data } = await api.requests.prepareTransfer({
    net: this.net,
    from,
    publicKey: publicKey ||  this.publicKey,
    ...options,
  })
  return data
}
