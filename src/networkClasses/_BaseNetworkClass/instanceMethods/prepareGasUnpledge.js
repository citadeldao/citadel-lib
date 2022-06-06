import errors from '../../../errors'

// supported by Iost network only
export const prepareGasUnpledge = function () {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "prepareGasUnpledge" method or not yet implemented`,
  })
}
