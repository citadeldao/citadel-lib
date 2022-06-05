import errors from '../../../../errors'
import networks from '../../../../networks'

export default function (type = 'seed', index = 0) {
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

  return derivationPathTemplates[type][0].key.replace('N', index)
}
