import errors from '../../../errors'

// only supported by BSC network
export const getDaoCalculatorData = function () {
  errors.throwError('MethodNotSupported', {
    method: 'getDaoCalculatorData',
    net: this.net,
  })
}
