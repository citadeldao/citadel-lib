import errors from '../../../errors'

// only supported by Polkadot network
export const polkadotPrepareClaimUnstaked = function () {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "polkadotPrepareClaimUnstaked" method or not yet implemented`,
  })
}
