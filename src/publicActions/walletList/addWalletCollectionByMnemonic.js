import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import { addWalletByMnemonic } from './addWalletByMnemonic'
import errors from '../../errors'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

export const addWalletCollectionByMnemonic = async (walletsOptions) => {
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
        console.warn(`Wallet with net "${walletOptions.net}" and`, error)
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
}
