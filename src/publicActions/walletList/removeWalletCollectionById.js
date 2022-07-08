import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import walletsManager from '../../walletsManager'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

export const removeWalletCollectionById = async (walletsOptions) => {
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
}
