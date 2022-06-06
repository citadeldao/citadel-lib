import errors from '../../../errors'

// only supported by BSC network
export const getAssignedAddresses = function () {
  errors.throwError('MethodNotSupported', {
    method: 'getAssignedAddresses',
    net: this.net,
  })
}
