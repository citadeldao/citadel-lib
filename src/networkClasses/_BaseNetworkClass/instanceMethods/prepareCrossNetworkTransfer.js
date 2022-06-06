import errors from '../../../errors'

// by default not supported
export const prepareCrossNetworkTransfer = async function () {
  errors.throwError('MethodNotSupported', {
    method: 'prepareCrossNetworkTransfer',
    net: this.net,
  })
}
