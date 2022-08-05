import api from '../api'
import { io } from 'socket.io-client'
import { addListeners } from './addListeners'
import {
  USERS_SOCKET_EVENT_NAMES,
  MARKETCAPS_SOCKET_EVENT_NAMES,
} from '../constants'
import state from '../state'

let usersSocket = null
let marketcapsSocket = null

const connect = async () => {
  try {
    // get socket base url
    const baseWSURL = state.getState('socketURL')
      // remove 'user'
      .split('/')
      .slice(0, -1)
      .join('/')

    // get socket token
    const { data: token } = await api.requests.getSocketToken()

    // create socket.io instance for /users
    usersSocket = io(`${baseWSURL}/users`, {
      transports: ['websocket'],
      upgrade: false,
      query: { token },
    })

    // create socket.io instance for /marketcaps
    marketcapsSocket = io(`${baseWSURL}/marketcaps`, {
      transports: ['websocket'],
      upgrade: false,
      query: { token },
    })
  } catch (error) {
    console.error(`Socket connection error`, error)
  }
}

const init = async () => {
  // connect socket.io
  await connect()
  // add listneners for /users events
  addListeners(usersSocket, USERS_SOCKET_EVENT_NAMES)
  // add listneners for /marketcaps events
  addListeners(marketcapsSocket, MARKETCAPS_SOCKET_EVENT_NAMES)
}

const reset = async () => {
  // disconnect socket.io instance
  await usersSocket?.disconnect()
  await marketcapsSocket?.disconnect()
  // delete socket.io instances
  usersSocket = null
  marketcapsSocket = null
}

export default {
  init,
  reset,
}
