import networks from '../../networks'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

export default async (options) => {
  checkInitialization()
  checkTypes(['options', options, ['Object'], true])
  const { net, privateKey, account } = options
  checkTypes(
    ['net', net, ['String'], true],
    ['privateKey', privateKey, ['String'], true],
    ['account', account, ['String']]
  )
  checkNetwork(net)

  return await networks.getNetworkClass(net).createWalletByPrivateKey({
    privateKey,
    account,
  })
}
