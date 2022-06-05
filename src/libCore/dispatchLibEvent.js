import state from '../state'
import { EVENT_NAMES } from '../constants'

export default async (eventName, callbackArgument) => {
  if (eventName === EVENT_NAMES.walletListUpdated) {
    await state.getState('walletListUpdatedCallback')(callbackArgument)
    return
  }
}
