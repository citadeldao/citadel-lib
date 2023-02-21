import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import { addWalletByPublicKey } from './addWalletByPublicKey'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES, LIB_EVENT_BLOCK_FLAGS } from '../../constants'
import state from '../../state'

export const addWalletCollectionByPublicKey = async (walletsOptions) => {
  try{
    // !IMPORTANT: delay wallet list update for getWalletList(detail) method, when adding wallet(s)
    state.setState(LIB_EVENT_BLOCK_FLAGS.DELAY_WALLET_LIST_UPDATE_DETAIL, true)
    
    // сhecks
    checkInitialization()
    checkTypes(['walletsOptions', walletsOptions, ['Array'], true])
    walletsOptions.map(({ net, address, title }, index) => {
      checkTypes(
        [`[walletIndex_${index}].net`, net, ['String'], true],
        [`[walletIndex_${index}].address`, address, ['String'], true],
        [`[walletIndex_${index}].title`, title, ['String']]
      )
    })

    const addedWallets = await Promise.all(
      walletsOptions.map(async (walletOptions, walletIndex) => {
        try {
          return await addWalletByPublicKey(walletOptions)
        } catch (error) {
          error.message = `For wallet with net "${walletOptions.net}" and index "${walletIndex}". ${error.message}`
          // if error - return object with error instead wallet
          return { error: error.toString(), code: error.code }
        }
      })
    )

    // EVENT: inform the client that it is time to update wallet list
    dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)

    // filter added wallets
    return addedWallets
  }finally{
    // unlock wallet list update for getWalletList(detail) method, after wallet(s) has been added
    state.setState(LIB_EVENT_BLOCK_FLAGS.DELAY_WALLET_LIST_UPDATE_DETAIL, false)
  }
}
