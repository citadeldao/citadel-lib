import { checkTypes } from '../../helpers/checkArguments'
import walletsManager from '../../walletsManager'
import { checkInitialization } from '../../helpers/checkArguments'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES, LIB_EVENT_BLOCK_FLAGS } from '../../constants'
import state from '../../state'

export const setWalletList = async (wallets, options) => {
  try{
    // !IMPORTANT: delay wallet list update for getWalletList(detail) method, when adding wallet(s)
    state.setState(LIB_EVENT_BLOCK_FLAGS.DELAY_WALLET_LIST_UPDATE_DETAIL, true)
    
    // checks
    checkTypes(
      ['wallets', wallets, ['Array'], true],
      ['options', options, ['Object']],
      ['addNotAddedWallets', options?.addNotAddedWallets, ['Boolean']]
    )
    checkInitialization()

    // set wallets
    await walletsManager.setWalletList(wallets, options)

    // EVENT: inform the client that it is time to update wallet list
    dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
  }finally{
    // unlock wallet list update for getWalletList(detail) method, after wallet(s) has been added
    state.setState(LIB_EVENT_BLOCK_FLAGS.DELAY_WALLET_LIST_UPDATE_DETAIL, false)
  }
}
