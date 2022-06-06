import errors from '../../../errors'

// by default not supported
export const createMessageSignature = function () {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "createMessageSignature" method or not yet implemented`,
  })
}
