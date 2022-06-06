import errors from '../../../errors'

// only supported by Bsc network
export const getUnassignedAddresses = function () {
  errors.throwError('MethodNotSupported', {
    method: 'getUnassignedAddresses',
    net: this.net,
  })
}
