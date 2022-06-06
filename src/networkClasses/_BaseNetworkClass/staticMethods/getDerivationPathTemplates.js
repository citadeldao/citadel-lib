import errors from '../../../errors'
import networkClasses from '../../'

export const getDerivationPathTemplates = function (type = 'seed') {
  const derivationPathTemplate = networkClasses.getNetworkClass(this.net)
    .derivationPathTemplates[type]

  // if no template throw error
  !derivationPathTemplate &&
    errors.throwError('MethodNotImplemented', {
      message: `Type "${type}" is not yet implemented or not supported for "${
        this.net
      }" network. Supported types: '${Object.keys(
        networkClasses.getNetworkClass(this.net).derivationPathTemplates
      ).join('", "')}`,
    })

  return derivationPathTemplate
}
