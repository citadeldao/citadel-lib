import errors from '../../../../errors'

export default function() {
  errors.throwError('MethodNotSupported', {
    method: 'getSavedViewingKeys',
    net: this.net,
  })
}
