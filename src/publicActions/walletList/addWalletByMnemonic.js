import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import walletsManager from '../../walletsManager'
import { network as networkPublicActions } from '../network'
import { dispatchLibEvent } from '../../dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

export const addWalletByMnemonic = async (options) => {
  // checks
  checkInitialization()
  checkTypes(['options', options, ['Object'], true])
  const { net, mnemonic, derivationPath, title, passphrase, account } = options
  checkTypes(['title', title, ['String']])

  // generate wallet by privateKey
  const createdWallet = await networkPublicActions.createWalletByMnemonic({
    net,
    mnemonic,
    derivationPath,
    passphrase,
    account,
  })
  // save privateKey, derivation and mnemonic path for return
  const createdPrivateKey = createdWallet.privateKey
  const createdDerivationPath = createdWallet.derivationPath

  // do not save it to storage
  delete createdWallet.privateKey
  delete createdWallet.derivationPath
  // for polka dot
  delete createdWallet.mnemonic

  // add new wallet
  const newWallet = await walletsManager.addCreatedWallet({
    createdWallet,
    title,
  })
  // return if the wallet has not been added
  if (!newWallet) return

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)

  // return wallet with private key and derivation path
  return {
    ...newWallet,
    privateKey: createdPrivateKey,
    derivationPath: createdDerivationPath,
    // mnemonic,
  }
}
