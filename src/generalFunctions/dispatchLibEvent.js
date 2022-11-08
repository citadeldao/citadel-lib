import state from '../state'
import {
  LIB_EVENT_CALLBACK_NAMES,
  LIB_EVENT_NAMES,
  LIB_EVENT_BLOCK_FLAGS,
} from '../constants'
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
const minEventsInterval = {
  // eventName: interval(ms)
  [LIB_EVENT_NAMES.WALLET_LIST_UPDATED]: 1000,
  [LIB_EVENT_NAMES.STORAGE_CHANGED_EXTERNALLY]: 1000,
}

const lastEventsTime = {
  // eventName: timeStamp
  [LIB_EVENT_NAMES.WALLET_LIST_UPDATED]: 0,
  [LIB_EVENT_NAMES.STORAGE_CHANGED_EXTERNALLY]: 0,
}

const dispatchEvent = async (eventName, callbackArgument) => {
  // debug logs
  state.getState('debugEvents') &&
    debugConsole.log(
      `Lib event: "${eventName}". CallbackArgument: `,
      callbackArgument
    )

  // skip if event was blocked (in some component)
  if (state.getState(LIB_EVENT_BLOCK_FLAGS[eventName])) {
    debugConsole.log(`Lib event: "${eventName}" blocked`)
    return
  }

  // run callback by its name
  await state.getState(LIB_EVENT_CALLBACK_NAMES[eventName])(callbackArgument)
}

export const dispatchLibEvent = async (eventName, callbackArgument) => {
  // CASE 1: dispatch lib event if no minEventInterval
  if (!Object.keys(minEventsInterval).includes(eventName)) {
    // dispatch other events
    await dispatchEvent(eventName, callbackArgument)
    return
  }

  // CASE 2: event is already waiting to be dispatch? - skip it
  if (lastEventsTime[eventName] > Date.now()) {
    return
  }

  // CASE 3: first event. Or last event sent more than lastEventsTime[eventName] ago
  if (
    lastEventsTime[eventName] <
    Date.now() - minEventsInterval[eventName]
  ) {
    // set current time
    lastEventsTime[eventName] = Date.now()
    // dispatch event
    await dispatchEvent(eventName, callbackArgument)
    return
  }

  // CASE 4: event dispatched less than a min interval ago
  const timeSinceLastEvent = Date.now() - lastEventsTime[eventName]
  // calc delay
  const delay = minEventsInterval[eventName] - timeSinceLastEvent
  // set future event time
  minEventsInterval[eventName] = Date.now() + delay
  // dispatch event with delay
  setTimeout(
    () => dispatchEvent(eventName, callbackArgument),
    // dispatch after minEventsInterval[eventName] from last event
    delay
  )
}
