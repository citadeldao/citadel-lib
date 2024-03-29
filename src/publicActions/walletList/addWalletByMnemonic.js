import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import walletsManager from '../../walletsManager'
import { network as networkPublicActions } from '../network'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES, LIB_EVENT_BLOCK_FLAGS } from '../../constants'
import state from '../../state'
import errors from '../../errors'

export const addWalletByMnemonic = async (options) => {
  try{
    // !IMPORTANT: delay wallet list update for getWalletList(detail) method, when adding wallet(s)
    state.setState(LIB_EVENT_BLOCK_FLAGS.DELAY_WALLET_LIST_UPDATE_DETAIL, true)
    
    // checks
    checkInitialization()
    checkTypes(['options', options, ['Object'], true])
    const { net, mnemonic, derivationPath, title, passphrase, account, oneSeed } =
      options
    checkTypes(
      ['title', title, ['String']],
      ['mnemonic', mnemonic, ['String'], true]
    )

    if (mnemonic.trim() === '') {
      errors.throwError('WrongArguments', { message: 'Mnemonic is empty' })
    }

    // generate wallet by privateKey
    const createdWallet = await networkPublicActions.createWalletByMnemonic({
      net,
      mnemonic,
      derivationPath,
      passphrase,
      account,
      oneSeed,
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
      ...(createdPrivateKey && { privateKey: createdPrivateKey }),
      derivationPath: createdDerivationPath,
    }
  }finally{
    // unlock wallet list update for getWalletList(detail) method, after wallet(s) has been added
    state.setState(LIB_EVENT_BLOCK_FLAGS.DELAY_WALLET_LIST_UPDATE_DETAIL, false)
  }
}
