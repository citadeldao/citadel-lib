import errors from '../../../../errors'

export default function() {
  errors.throwError('MethodNotSupported', {
    method: 'getAllDaoRewards',
    net: this.net,
  })
}
