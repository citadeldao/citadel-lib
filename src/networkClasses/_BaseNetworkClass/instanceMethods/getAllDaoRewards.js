import errors from '../../../errors'

// by default not supported
export const getAllDaoRewards = function () {
  errors.throwError('MethodNotSupported', {
    method: 'getAllDaoRewards',
    net: this.net,
  })
}
