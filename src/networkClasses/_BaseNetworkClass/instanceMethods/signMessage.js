import errors from '../../../errors'

// by default not supported
export const signMessage = async function () {
  errors.throwError('MethodNotImplemented', {
    method: `"signMessage" for "${this.net}" network`,
  })
}
