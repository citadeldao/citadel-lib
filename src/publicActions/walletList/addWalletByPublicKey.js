import networks from '../../networks'
import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import libCore from '../../libCore'

export default async (options) => {
  checkInitialization()
  checkTypes(['options', options, ['Object'], true])
  const { net, address, title } = options
  checkTypes(
    ['net', net, ['String'], true],
    ['address', address, ['String'], true],
    ['title', title, ['String']]
  )

  // create public wallet
  const createdWallet = networks
    .getNetworkClass(net)
    .createPublicWallet({ net, address })

  const newWallet = await libCore.addCreatedWallet({ createdWallet, title })
  // return if the wallet has not been added
  if (!newWallet) return

  return newWallet
}
