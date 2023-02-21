import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import walletsManager from '../../walletsManager'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES, LIB_EVENT_BLOCK_FLAGS } from '../../constants'
import state from '../../state'

export const removeWalletCollectionById = async (walletsOptions) => {
  try{
    // !IMPORTANT: delay wallet list update for getWalletList(detail) method, when adding wallet(s)
    state.setState(LIB_EVENT_BLOCK_FLAGS.DELAY_WALLET_LIST_UPDATE_DETAIL, true)
    
    // checks
    checkInitialization()

    checkTypes(['walletsOptions', walletsOptions, ['Array'], true])

    walletsOptions.map(({ id }, index) => {
      checkTypes([`[walletIndex_${index}].id`, id, ['String', 'Number'], true])
    })

    // fast parallel remove
    await Promise.all(
      walletsOptions.map(async ({ id }) => {
        await walletsManager.removeWallet(id)
      })
    )

    // EVENT: inform the client that it is time to update wallet list
    dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
  }finally{
    // unlock wallet list update for getWalletList(detail) method, after wallet(s) has been added
    state.setState(LIB_EVENT_BLOCK_FLAGS.DELAY_WALLET_LIST_UPDATE_DETAIL, false)
  }
}
