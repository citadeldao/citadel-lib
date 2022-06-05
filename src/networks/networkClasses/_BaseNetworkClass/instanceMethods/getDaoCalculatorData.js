import errors from '../../../../errors'

export default function() {
  errors.throwError('MethodNotSupported', {
    method: 'getDaoCalculatorData',
    net: this.net,
  })
}
