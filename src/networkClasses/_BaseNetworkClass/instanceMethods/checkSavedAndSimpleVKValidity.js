import errors from '../../../errors'

// only supported by Secret network
export const checkSavedAndSimpleVKValidity = function () {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "checkSavedAndSimpleVKValidity" method or not yet implemented`,
  })
}
