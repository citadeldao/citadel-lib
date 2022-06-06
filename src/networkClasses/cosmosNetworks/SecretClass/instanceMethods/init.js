import { dispatchLibEvent } from '../../../../dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../../../constants'

export async function init() {
  await this.checkSavedAndSimpleVKValidity()

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
}
