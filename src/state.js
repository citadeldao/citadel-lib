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
  stringifyResponse: false,
  stringifyLogs: false,
  supportedNetworkKeys: [],
  daoSupportedNetworks: [],
  supportedTokens: {},
  // event callbacks
  walletListUpdatedCallback: () => {},
}

// getter to get the current state (without losing the reference to the state object)
const getState = (key) => state[key]
// setter (without touching the rest of the state)
const setState = (key, value) => (state[key] = value)
// for init and reset state object
const setDefaultState = () => (state = { ...defaultState })

export default {
  getState,
  setState,
  setDefaultState,
}
