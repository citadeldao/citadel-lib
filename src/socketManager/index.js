import api from '../api'
import { parseSocketObject } from './parseSocketObject'
import { io } from 'socket.io-client'
import { addListeners } from './addListeners'

let socket = null

const connect = async () => {
  try {
    // get socket token
    const { data: token } = await api.requests.getSocketToken()

    // init and set socket.io instance
    socket = io(process.env.VUE_APP_BACKEND_WS_URL, {
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
  // add listneners
  addListeners(socket)
}

const reset = async () => {
  // disconnect socket.io instance
  await socket?.disconnect()
  // delete socket.io instance
  socket = null
}

export default {
  parseSocketObject,
  init,
  reset,
}
