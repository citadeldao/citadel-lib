import errors from '../../../errors'

// only supported by Secret network
export const executeMessageCollection = function () {
  errors.throwError('MethodNotSupported', {
    method: 'executeContract',
    net: this.net,
  })
}
