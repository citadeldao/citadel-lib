import errors from '../../../../errors'

export default function() {
  errors.throwError('MethodNotSupported', {
    method: 'setViewingKey',
    net: this.net,
  })
}
