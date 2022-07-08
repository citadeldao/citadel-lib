import networkClasses from '../../networkClasses'
import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import walletsManager from '../../walletsManager'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

export const addWalletByPublicKey = async (options) => {
  checkInitialization()
  checkTypes(['options', options, ['Object'], true])
  const { net, address, title } = options
  checkTypes(
    ['net', net, ['String'], true],
    ['address', address, ['String'], true],
    ['title', title, ['String']]
  )

  // create public wallet
  const createdWallet = networkClasses
    .getNetworkClass(net)
    .createPublicWallet({ net, address })

  const newWallet = await walletsManager.addCreatedWallet({
    createdWallet,
    title,
  })

  // return if the wallet has not been added
  if (!newWallet) return

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)

  return newWallet
}
