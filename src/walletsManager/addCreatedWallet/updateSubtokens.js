import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'
import walletInstances from '../../walletInstances'

// update subtokens function
export const updateSubtokens = async (walletId) => {
  await walletInstances.getWalletInstanceById(walletId).updateSubtokensList()
  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
}
