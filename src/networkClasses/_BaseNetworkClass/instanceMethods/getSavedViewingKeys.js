import errors from '../../../errors'

// only supported by Secret network
export const getSavedViewingKeys = function () {
  errors.throwError('MethodNotSupported', {
    method: 'getSavedViewingKeys',
    net: this.net,
  })
}
