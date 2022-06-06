import errors from '../../../errors'

// by default not supported
export const prepareClaim = function () {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "prepareClaim" method or not yet implemented`,
  })
}
