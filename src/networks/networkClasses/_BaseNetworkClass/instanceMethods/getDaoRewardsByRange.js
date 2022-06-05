import errors from '../../../../errors'

export default function() {
  errors.throwError('MethodNotSupported', {
    method: 'getDaoRewardsByRange',
    net: this.net,
  })
}
