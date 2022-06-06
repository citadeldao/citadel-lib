import errors from '../../errors'
import { checkTypes } from '../../helpers/checkArguments'
import { LIB_EVENT_NAMES, LIB_EVENT_CALLBACK_NAMES } from '../../constants'
import state from '../../state'

/**
 * Sets up a function that will be called whenever the specified event is dispatched from the library
 * NOTE: Сan be used before initialization
 * @param eventName STRING (REQUIRED) - lib event name. Possible values: 'walletListUpdated', 'socketEvent'
 * @param callback FUNCTION (REQUIRED) - The function to be called on the event
 * @returns Returns NULL.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = citadel.addEventListener('walletListUpdated', () => console.log('updated'))
 *
 * // =>
 * {
 *   result: "success",
 *   data: null,
 *   error: null
 * }
 */

export const addEventListener = (eventName, callback) => {
  // checks
  checkTypes(
    ['eventName', eventName, ['String'], true],
    ['callback', callback, ['Function', 'AsyncFunction'], true]
  )

  if (!Object.values(LIB_EVENT_NAMES).includes(eventName)) {
    errors.throwError('WrongArguments', {
      message: `Event "${eventName}" not supported. Supported events: ${JSON.stringify(
        Object.values(LIB_EVENT_NAMES)
      )}`,
    })
  }

  // set event callback to state by event name
  state.setState(LIB_EVENT_CALLBACK_NAMES[eventName], callback)
}
