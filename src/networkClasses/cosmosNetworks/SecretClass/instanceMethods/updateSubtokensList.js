import { updateSubtokensList as baseUpdateSubtokensList } from '../../../_BaseNetworkClass/instanceMethods/updateSubtokensList'
import { dispatchLibEvent } from '../../../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../../../constants'

export async function updateSubtokensList() {
  // ICS20 update
  // instead "super"
  await baseUpdateSubtokensList.call(this)

  // SNIP20 update (do not await by default), but dispatch event walletListUpdated
  this.updateSnip20SubtokensList()
  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
}
