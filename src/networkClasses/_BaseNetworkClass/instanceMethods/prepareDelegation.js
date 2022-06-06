import errors from '../../../errors'

// by default not supported
export const prepareDelegation = function () {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "prepareDelegation" method or not yet implemented`,
  })
}
