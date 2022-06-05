import errors from '../../../../errors'

export default function() {
  errors.throwError('MethodNotSupported', {
    method: 'importViewingKey',
    net: this.net,
  })
}
