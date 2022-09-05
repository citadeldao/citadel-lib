import errors from '../../../errors'

export async function loadKeplrSnip20Balances() {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "loadKeplrSnip20Balances" method or not yet implemented`,
  })
}
