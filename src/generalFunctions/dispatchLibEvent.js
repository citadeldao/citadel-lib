import state from '../state'
import { LIB_EVENT_CALLBACK_NAMES } from '../constants'
import { debugConsoleLog } from '../helpers/debugConsoleLog'

// executes the callback assigned to the given event
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
