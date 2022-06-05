import errors from '../../../../errors'
import networks from '../../..'

export default function (type = 'seed') {
  const derivationPathTemplates = networks.getNetworkClass(
    this.net
  ).derivationPathTemplates
  if (!derivationPathTemplates[type]) {
    errors.throwError('MethodNotImplemented', {
      message: `Type "${type}" is not yet implemented or not supported for "${
        this.net
      }" network. Supported types: '${Object.keys(derivationPathTemplates).join(
        '", "'
      )}`,
    })
  }

  return derivationPathTemplates[type]
}
