import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import walletsManager from '../../walletsManager'
import { network as networkPublicActions } from '../network'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

export const addWalletByLedger = async (options) => {
  // checks
  checkInitialization()
  checkTypes(['options', options, ['Object'], true])
  const { net, derivationPath, title } = options
  checkTypes(['title', title, ['String']])

  const createdWallet = await networkPublicActions.createWalletByLedger({
    net,
    derivationPath,
  })
  // save (formatted) derivationPath for return
  const createdDerivationPath = createdWallet.derivationPath
  // delete derivationPath from createdWallet (do not save it to storage)
  delete createdWallet.derivationPath

  // add new wallet
  const newWallet = await walletsManager.addCreatedWallet({
    createdWallet,
    title,
  })
  // return if the wallet has not been added
  if (!newWallet) return

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)

  // return wallet with derivationPath and derivation path
  return {
    ...newWallet,
    derivationPath: createdDerivationPath,
  }
}
