import { has } from 'lodash'
import { LIB_EVENT_NAMES, LIB_EVENT_CALLBACK_NAMES } from './constants'

// General state for all lib modules
let state = {}

// default state Object for init / reset lib
const defaultState = {
  isInitialized: false,
  user: {
    id: null,
    login: null,
    subscribe_rewards: null,
  },
  debug: false,
  backendUrl: '',
  socketURL: null,
  stringifyResponse: false,
  stringifyLogs: false,
  supportedNetworkKeys: [],
  daoSupportedNetworks: [],
  supportedTokens: {},
  stakeNodesUpdated: false,
  // event callbacks. Computed property to prevent errors and for simple event handling
  [LIB_EVENT_CALLBACK_NAMES[LIB_EVENT_NAMES.WALLET_LIST_UPDATED]]: () => {},
  [LIB_EVENT_CALLBACK_NAMES[LIB_EVENT_NAMES.SOCKET_EVENT]]: () => {},
}

// check state property name to prevent error
const checkStatePropertyName = (key) => {
  if (!has(state, key)) {
    console.warn(`State property "${key}" does not registered`)
  }
}

// getter to get the current state (without losing the reference to the state object)
const getState = (key) => {
  // check state property name validity to prevent errors
  checkStatePropertyName(key)

  return state[key]
}

// setter (without touching the rest of the state)
const setState = (key, value) => {
  // check state property name validity to prevent errors
  checkStatePropertyName(key)

  state[key] = value
}

// for reset state object
const setDefaultState = () => (state = { ...defaultState })

setDefaultState()

export default {
  getState,
  setState,
  setDefaultState,
}
