import errors from '../../../../errors'

export default async function() {
  errors.throwError('MethodNotImplemented', {
    method: `"signTransaction" for "${this.net}" network`,
  })
}
