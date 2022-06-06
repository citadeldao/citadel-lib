import errors from '../../../errors'

// only supported by Secret network
export const deleteViewingKey = function () {
  errors.throwError('MethodNotSupported', {
    method: 'deleteViewingKey',
    net: this.net,
  })
}
