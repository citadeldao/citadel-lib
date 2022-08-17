import state from '../state'
import { LIB_EVENT_CALLBACK_NAMES } from '../constants'
import { debugConsoleLog } from '../helpers/debugConsoleLog'

/****************** DISPATCH LIB EVENT *********************
 * Executes the callback assigned to the given event.
 *
 * HOW TO USE:
 * // inform the client that the list of wallets has been updated
 * // and the values in the UI should be updated too
 * dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
 **********************************************************/

export const dispatchLibEvent = async (eventName, callbackArgument) => {
  // debug logs
  state.getState('debugEvents') &&
    debugConsoleLog(
      `Lib event: "${eventName}". CallbackArgument: `,
      callbackArgument
    )
  // run callback by its name
  await state.getState(LIB_EVENT_CALLBACK_NAMES[eventName])(callbackArgument)
}
