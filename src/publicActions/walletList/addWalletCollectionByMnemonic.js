import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import { addWalletByMnemonic } from './addWalletByMnemonic'
import errors from '../../errors'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES, LIB_EVENT_BLOCK_FLAGS } from '../../constants'
import state from '../../state'
import { debugConsole } from '../../helpers/debugConsole'

export const addWalletCollectionByMnemonic = async (walletsOptions) => {
  try{
    // !IMPORTANT: delay wallet list update for getWalletList(detail) method, when adding wallet(s)
    state.setState(LIB_EVENT_BLOCK_FLAGS.DELAY_WALLET_LIST_UPDATE_DETAIL, true)
    
    // checks
    checkInitialization()

    checkTypes(['walletsOptions', walletsOptions, ['Array'], true])
    !walletsOptions.length &&
      errors.throwError('WrongArguments', {
        message: 'walletsOptions array is empty',
      })
    // check title type
    walletsOptions.map(({ title }, index) => {
      checkTypes([(`[walletIndex_${index}].title`, title, ['String'])])
    })

    // loop with addWalletByMnemonic
    const addedWallets = await Promise.all(
      walletsOptions.map(async (walletOptions, walletIndex) => {
        try {
          // add wallet by mnemonic
          return await addWalletByMnemonic(walletOptions)
          // catch error to continue
        } catch (error) {
          debugConsole.warn(`Wallet with net "${walletOptions.net}" and`, error)
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
