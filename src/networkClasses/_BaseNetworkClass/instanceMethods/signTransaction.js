import errors from '../../../errors'

// by default not supported (each net has its own)
export const signTransaction = async function () {
  errors.throwError('MethodNotImplemented', {
    method: `"signTransaction" for "${this.net}" network`,
  })
}
