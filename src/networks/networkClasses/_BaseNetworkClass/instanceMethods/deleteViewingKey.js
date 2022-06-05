import errors from '../../../../errors'

export default function() {
  errors.throwError('MethodNotSupported', {
    method: 'deleteViewingKey',
    net: this.net,
  })
}
