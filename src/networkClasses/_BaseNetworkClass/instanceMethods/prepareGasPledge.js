import errors from '../../../errors'

// supported by Iost network only
export const prepareGasPledge = function () {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "prepareGasPledge" method or not yet implemented`,
  })
}
