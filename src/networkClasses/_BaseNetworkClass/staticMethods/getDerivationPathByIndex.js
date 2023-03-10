import errors from '../../../errors'
import networkClasses from '../../../networkClasses'

export const getDerivationPathByIndex = function (type = 'seed', index = 0) {
  // get derivation path template
  console.log(333,networkClasses.getNetworkClass(this.net).derivationPathTemplates);
  const derivationPathTemplate = networkClasses.getNetworkClass(this.net)
    .derivationPathTemplates[type]?.[0].key

  // if no template throw error
  !derivationPathTemplate &&
    errors.throwError('MethodNotImplemented', {
      message: `Type "${type}" is not yet implemented or not supported for "${
        this.net
      }" network. Supported types: '${Object.keys(
        networkClasses.getNetworkClass(this.net).derivationPathTemplates
      ).join('", "')}`,
    })

  // replace N with index
  return derivationPathTemplate.replace('N', index)
}
