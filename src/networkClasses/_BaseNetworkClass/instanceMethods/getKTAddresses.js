import errors from '../../../errors'

// only supported by Tezos network
export const getKTAddresses = function () {
  errors.throwError('MethodNotSupported', {
    method: 'getKTAddresses',
    net: this.net,
  })
}
