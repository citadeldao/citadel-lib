import { LIB_EVENT_NAMES } from '../constants'
import { eventHandlers } from './eventHandlers'
import { dispatchLibEvent } from '../dispatchLibEvent'

export const addListeners = (socket, socketEventNames) => {
  try {
    // add listeners for all registered socket event names
    Object.values(socketEventNames).map((eventName) => {
      // add listener
      socket.on(eventName, async (data) => {
        // run socket event handler if it exists (may change data object!)
        if (eventHandlers[eventName]) {
          await eventHandlers[eventName](data)
        }
        // proxy socket event to client with lib event
        dispatchLibEvent(LIB_EVENT_NAMES.SOCKET_EVENT, {
          eventName,
          data,
        })
      })
    })
  } catch (error) {
    console.error(`Add socket listeners error`, error)
  }
}
