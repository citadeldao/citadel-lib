import errors from '../../../../errors'

export default function() {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "prepareClaim" method or not yet implemented`,
  })
}
