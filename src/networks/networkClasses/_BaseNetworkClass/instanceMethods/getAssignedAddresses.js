import errors from '../../../../errors'

export default function() {
  errors.throwError('MethodNotSupported', {
    method: 'getAssignedAddresses',
    net: this.net,
  })
}
