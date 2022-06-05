import networks from '../../networks'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

export default async (options) => {
  checkInitialization()
  checkTypes(['options', options, ['Object'], true])
  const networkClass = networks.getNetworkClass(options.net)
  const {
    net,
    derivationPath = networkClass.getDerivationPathByIndex('ledger'),
  } = options

  checkTypes(
    ['net', net, ['String'], true],
    ['derivationPath', derivationPath, ['String']]
  )

  checkNetwork(net)

  return await networkClass.createWalletByLedger({
    derivationPath,
  })
}
