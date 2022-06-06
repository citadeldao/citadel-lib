import errors from '../../../errors'

// only supported by Iost network
export const getAccountsByPrivateKey = function () {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "getAccountsByPrivateKey" method or not yet implemented`,
  })
}
