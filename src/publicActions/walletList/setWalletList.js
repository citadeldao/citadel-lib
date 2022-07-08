import { checkTypes } from '../../helpers/checkArguments'
import walletsManager from '../../walletsManager'
import { checkInitialization } from '../../helpers/checkArguments'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

export const setWalletList = async (wallets, options) => {
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
}
