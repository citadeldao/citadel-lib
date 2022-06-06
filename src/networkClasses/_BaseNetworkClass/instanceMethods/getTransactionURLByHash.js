import errors from '../../../errors'

// not supported by default (each net has its own)
export const getTransactionURLByHash = function () {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "getTransactionURLByHash" method or not yet implemented`,
  })
}
