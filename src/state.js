import has from 'lodash/has'
import {
  LIB_EVENT_NAMES,
  LIB_EVENT_CALLBACK_NAMES,
  LIB_EVENT_BLOCK_FLAGS,
} from './constants'
import { debugConsole } from './helpers/debugConsole'
/******************** STATE MODULE *************************
 * Object (store) with library states. With getters and setters for easy access from other modules
 * Upon init or reset, the library is set to the default state, in which all used keys are registered
 *
 * HOW TO USE:
 * // set state
 * state.setState('stakeList', value)
 **********************************************************/

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
  debugEvents: false,
  backendUrl: '',
  backendApiVersion: '',
  publicBackendUrl: null,
  proxyBackendUrl: null,
  socketURL: null,
  appURL: null,
  isExtension: false,
  maxExtesionCreatedId: 0,
  stringifyResponse: false,
  stringifyLogs: false,
  supportedNetworkKeys: [],
  daoSupportedNetworks: [],
  supportedTokens: {},
  stakeList: false,
  accessToken: null,
  refreshToken: null,
  ledgerFlutterTransport: false,

  // TODO: refact (events state / module?)
  // event callbacks. Computed property to prevent errors and for simple event handling
  [LIB_EVENT_CALLBACK_NAMES[LIB_EVENT_NAMES.WALLET_LIST_UPDATED]]: () => {},
  [LIB_EVENT_CALLBACK_NAMES[LIB_EVENT_NAMES.SOCKET_EVENT]]: () => {},
  [LIB_EVENT_CALLBACK_NAMES[LIB_EVENT_NAMES.TOKEN_REFRESHED]]: () => {},
  [LIB_EVENT_CALLBACK_NAMES[LIB_EVENT_NAMES.REFRESHED_TOKEN_EXPIRED]]: () => {},
  [LIB_EVENT_CALLBACK_NAMES[LIB_EVENT_NAMES.LEDGER_SIGNING_FINISHED]]: () => {},
  [LIB_EVENT_CALLBACK_NAMES[LIB_EVENT_NAMES.LEDGER_SIGNING_STARTED]]: () => {},
  [LIB_EVENT_CALLBACK_NAMES[LIB_EVENT_NAMES.STORAGE_CHANGED_EXTERNALLY]]:
    () => {},
  [LIB_EVENT_CALLBACK_NAMES[LIB_EVENT_NAMES.EXTENSION_TX_MIDDLEWARE]]: () => {},

  // block event flags:
  [LIB_EVENT_BLOCK_FLAGS[LIB_EVENT_NAMES.WALLET_LIST_UPDATED]]: false,
  [LIB_EVENT_BLOCK_FLAGS[LIB_EVENT_NAMES.SOCKET_EVENT]]: false,
  [LIB_EVENT_BLOCK_FLAGS[LIB_EVENT_NAMES.TOKEN_REFRESHED]]: false,
  [LIB_EVENT_BLOCK_FLAGS[LIB_EVENT_NAMES.REFRESHED_TOKEN_EXPIRED]]: false,
  [LIB_EVENT_BLOCK_FLAGS[LIB_EVENT_NAMES.LEDGER_SIGNING_FINISHED]]: false,
  [LIB_EVENT_BLOCK_FLAGS[LIB_EVENT_NAMES.LEDGER_SIGNING_STARTED]]: false,
  [LIB_EVENT_BLOCK_FLAGS[LIB_EVENT_NAMES.STORAGE_CHANGED_EXTERNALLY]]: false,
  [LIB_EVENT_BLOCK_FLAGS[LIB_EVENT_NAMES.EXTENSION_TX_MIDDLEWARE]]: false,
  [LIB_EVENT_BLOCK_FLAGS.DELAY_WALLET_LIST_UPDATE_DETAIL]: false
}

// check state property name to prevent error
const checkStatePropertyName = (key) => {
  if (!has(state, key)) {
    debugConsole.warn(`State property "${key}" does not registered`)
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
