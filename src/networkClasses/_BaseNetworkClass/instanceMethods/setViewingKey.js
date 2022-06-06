import errors from '../../../errors'

// supported by Secret network only
export const setViewingKey = function () {
  errors.throwError('MethodNotSupported', {
    method: 'setViewingKey',
    net: this.net,
  })
}
