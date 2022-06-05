import errors from '../../../../errors'
// only supported by Secret network
export default function() {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "convertScrtToSecretScrt" method or not yet implemented`,
  })
}
