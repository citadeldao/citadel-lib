import errors from '../../../errors'

// not supported by default (each net has its own)
export const getScannerLinkById = function () {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "getScannerLinkById" method or not yet implemented`,
  })
}
