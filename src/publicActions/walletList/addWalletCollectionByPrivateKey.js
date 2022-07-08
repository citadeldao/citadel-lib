import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import errors from '../../errors'
import { addWalletByPrivateKey } from './addWalletByPrivateKey'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

export const addWalletCollectionByPrivateKey = async (walletsOptions) => {
  // checks
  checkInitialization()

  checkTypes(['walletsOptions', walletsOptions, ['Array'], true])
  !walletsOptions.length &&
    errors.throwError('WrongArguments', {
      message: 'walletsOptions array is empty ',
    })
  // check title type
  walletsOptions.map(({ title }, index) => {
    checkTypes([`[walletIndex_${index}].title`, title, ['String']])
  })

  // loop with addWalletByPrivateKey
  const addedWallets = await Promise.all(
    walletsOptions.map(async (walletOptions, walletIndex) => {
      try {
        return await addWalletByPrivateKey(walletOptions)
      } catch (error) {
        error.message = `For wallet with net "${walletOptions.net}" and index "${walletIndex}". ${error.message}`
        // if error - return object with error instead wallet
        return { error: error.toString() }
      }
    })
  )

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)

  // filter added wallets
  return addedWallets
}
