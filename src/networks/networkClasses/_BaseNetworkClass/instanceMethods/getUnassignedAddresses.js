import errors from '../../../../errors'

export default function() {
  errors.throwError('MethodNotSupported', {
    method: 'getUnassignedAddresses',
    net: this.net,
  })
}
