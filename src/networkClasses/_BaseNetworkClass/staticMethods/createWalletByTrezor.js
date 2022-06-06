import errors from '../../../errors'

// not supported by default (each net has its own)
export const createWalletByTrezor = function () {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "createWalletByTrezor" method or not yet implemented`,
  })
}
