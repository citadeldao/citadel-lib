import api from '../../../api'

// by default - proxy request to backend
export const prepareTransfer = async function (options) {
  let from = this.address;

  if (options.btcAddressType) {
    if (options.btcAddressType === 'segwit') from = this.segwitAddress;
    if (options.btcAddressType === 'native') from = this.nativeAddress;
  }

  const { data } = await api.requests.prepareTransfer({
    net: this.net,
    from,
    publicKey: this.publicKey,
    ...options,
  })
  return data
}
