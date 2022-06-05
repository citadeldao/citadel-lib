import errors from '../../../../errors'

export default function() {
  errors.throwError('MethodNotSupported', {
    method: 'getKTAddresses',
    net: this.net,
  })
}
