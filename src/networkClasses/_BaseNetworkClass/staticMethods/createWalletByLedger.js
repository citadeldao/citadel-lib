import errors from '../../../errors'

// not supported by default (each net has its own)
export const createWalletByLedger = function () {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "createWalletByLedger" method or not yet implemented`,
  })
}
