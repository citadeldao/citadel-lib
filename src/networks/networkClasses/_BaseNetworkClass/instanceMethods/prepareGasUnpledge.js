import errors from '../../../../errors'

export default function() {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "prepareGasUnpledge" method or not yet implemented`,
  })
}
