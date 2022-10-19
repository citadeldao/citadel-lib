import state from '../state'
import { LIB_EVENT_CALLBACK_NAMES, LIB_EVENT_NAMES } from '../constants'
import { debugConsole } from '../helpers/debugConsole'

/****************** DISPATCH LIB EVENT *********************
 * Executes the callback assigned to the given event.
 *
 * HOW TO USE:
 * // inform the client that the list of wallets has been updated
 * // and the values in the UI should be updated too
 * dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
 **********************************************************/

// trotling for too frequent events - minimum interval, ms
const minWalletListUpdatedEventInterval = 1000
// last dispatched time
let lastWalletListUpdatedEventTime = 0

const dispatchEvent = async (eventName, callbackArgument) => {
  // debug logs
  state.getState('debugEvents') &&
    debugConsole.log(
      `Lib event: "${eventName}". CallbackArgument: `,
      callbackArgument
    )
  // run callback by its name
  await state.getState(LIB_EVENT_CALLBACK_NAMES[eventName])(callbackArgument)
}

export const dispatchLibEvent = async (eventName, callbackArgument) => {
  // dispatch lib event (except WALLET_LIST_UPDATED)
  if (eventName !== LIB_EVENT_NAMES.WALLET_LIST_UPDATED) {
    // dispatch other events
    await dispatchEvent(eventName, callbackArgument)
    return
  }

  // FOR WALLET_LIST_UPDATED

  // event is already waiting to be dispatch - skip it
  if (lastWalletListUpdatedEventTime > Date.now()) {
    return
  }

  // first event or last event sent more than lastWalletListUpdatedEventTime ms ago
  if (
    lastWalletListUpdatedEventTime <
    Date.now() - minWalletListUpdatedEventInterval
  ) {
    // set current time
    lastWalletListUpdatedEventTime = Date.now()
    // dispatch event
    await dispatchEvent(eventName, callbackArgument)
    return
  }

  // event dispatched less than a second ago
  const timeSinceLastEvent = Date.now() - lastWalletListUpdatedEventTime
  // calc delay
  const delay = minWalletListUpdatedEventInterval - timeSinceLastEvent
  // set future event tim
  lastWalletListUpdatedEventTime = Date.now() + delay
  // dispatch event with delay
  setTimeout(
    () => dispatchEvent(eventName, callbackArgument),
    // dispatch after minWalletListUpdatedEventInterval from last event
    delay
  )
}
