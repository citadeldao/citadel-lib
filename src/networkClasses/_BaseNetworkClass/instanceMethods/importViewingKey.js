import errors from '../../../errors'

// only supported by Secret network
export const importViewingKey = function () {
  errors.throwError('MethodNotSupported', {
    method: 'importViewingKey',
    net: this.net,
  })
}
