import errors from '../../../../errors'

export default function () {
  errors.throwError('MethodNotSupported', {
    message: `"${this.net}" network doesn't support "polkadotPrepareClaimUnstaked" method or not yet implemented`,
  })
}
