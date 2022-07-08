import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import { addWalletByPublicKey } from './addWalletByPublicKey'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

export const addWalletCollectionByPublicKey = async (walletsOptions) => {
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
        return { error: error.toString() }
      }
    })
  )

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)

  // filter added wallets
  return addedWallets
}
