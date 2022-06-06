import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import walletsManager from '../../walletsManager'
import { network as networkPublicActions } from '../network'
import { dispatchLibEvent } from '../../dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

export const addWalletByPrivateKey = async (options) => {
  // checks
  checkInitialization()
  checkTypes(['options', options, ['Object'], true])
  const { net, privateKey, title, account } = options
  checkTypes(['title', title, ['String']])

  // generate wallet by privateKey
  const createdWallet = await networkPublicActions.createWalletByPrivateKey({
    net,
    privateKey,
    account,
  })

  // save (formatted) private key for return
  const createdPrivateKey = createdWallet.privateKey
  // delete private key from createdWallet (do not save it to storage)
  delete createdWallet.privateKey

  // add new wallet
  const newWallet = await walletsManager.addCreatedWallet({
    createdWallet,
    title,
  })
  // return if the wallet has not been added
  if (!newWallet) return

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)

  // return wallet with private key
  return { ...newWallet, privateKey: createdPrivateKey }
}
