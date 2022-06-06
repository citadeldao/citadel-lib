import errors from '../../../errors'

// only supported by BSC network
export const getDaoRewardsByRange = function () {
  errors.throwError('MethodNotSupported', {
    method: 'getDaoRewardsByRange',
    net: this.net,
  })
}
