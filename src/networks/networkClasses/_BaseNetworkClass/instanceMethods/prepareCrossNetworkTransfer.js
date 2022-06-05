import errors from '../../../../errors'

export default async function() {
  errors.throwError('MethodNotSupported', {
    method: 'prepareCrossNetworkTransfer',
    net: this.net,
  })
}
