import errors from '../../../../errors'
// only supported by Iost network
export default function() {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "createWalletByLedger" method or not yet implemented`,
  })
}
