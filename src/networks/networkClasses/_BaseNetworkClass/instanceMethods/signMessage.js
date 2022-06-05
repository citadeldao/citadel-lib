import errors from '../../../../errors'

export default async function () {
  errors.throwError('MethodNotImplemented', {
    method: `"signMessage" for "${this.net}" network`,
  })
}
