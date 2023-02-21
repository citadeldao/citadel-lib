import {
  checkTypes,
  checkInitialization,
  checkNetwork,
} from '../../helpers/checkArguments'
import walletsManager from '../../walletsManager'
import { network as networkPublicActions } from '../network'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES, LIB_EVENT_BLOCK_FLAGS } from '../../constants'
import state from '../../state'

export const addWalletByTrezor = async (options) => {
  try{
    // !IMPORTANT: delay wallet list update for getWalletList(detail) method, when adding wallet(s)
    state.setState(LIB_EVENT_BLOCK_FLAGS.DELAY_WALLET_LIST_UPDATE_DETAIL, true)
    
    // checks
    checkInitialization()
    checkTypes(['options', options, ['Object'], true])
    const { net, derivationPath, title } = options
    checkTypes(['title', title, ['String']])
    checkNetwork(net)

    // generate wallet by ledger
    const createdWallet = await networkPublicActions.createWalletByTrezor({
      net,
      derivationPath,
    })

    // save derivation path for return
    const createdDerivationPath = createdWallet.derivationPath
    // do not save it to storage
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

    // return wallet with derivation path
    return {
      ...newWallet,
      derivationPath: createdDerivationPath,
    }
  }finally{
    // unlock wallet list update for getWalletList(detail) method, after wallet(s) has been added
    state.setState(LIB_EVENT_BLOCK_FLAGS.DELAY_WALLET_LIST_UPDATE_DETAIL, false)
  }
}
