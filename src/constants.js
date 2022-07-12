// export const COSM_WASM_CLIENT_HTTP_URL = 'https://api-secret.citadel.one'

export const GRPC_WEB_URL = 'https://api-secret.citadel.one:9091/'

export const USERS_SOCKET_EVENT_NAMES = {
  TRANSACTION_EVENTS_CLIENT: 'transaction-events-client',
  MESSAGE_FROM_APP: 'message-from-app',
  ADDRESS_BALANCE_UPDATED_CLIENT: 'address-balance-updated-client',
  MEMPOOL_ADD_TX_CLIENT: 'mempool-add-tx-client',
  MEMPOOL_REMOVE_TX_CLIENT: 'mempool-remove-tx-client',
}

export const MARKETCAPS_SOCKET_EVENT_NAMES = {
  MARKETCAP_UPDATE_CLIENT: 'marketCap-update-client',
}

export const LIB_EVENT_NAMES = {
  WALLET_LIST_UPDATED: 'walletListUpdated',
  SOCKET_EVENT: 'socketEvent',
}

// computed properties to associate event with its callback in the state
export const LIB_EVENT_CALLBACK_NAMES = {
  [LIB_EVENT_NAMES.WALLET_LIST_UPDATED]: 'walletListUpdatedCallback',
  [LIB_EVENT_NAMES.SOCKET_EVENT]: 'socketEventCallback',
}

export const CACHE_NAMES = {
  SUPPORTED_NETWORK_KEYS: 'supportedNetworkKeys',
  NETWORKS_CONFIG: 'networksConfig',
  RATES: 'rates',
  MARKETCAPS: 'marketcaps',
  DAO_SUPPORTED_NETWORKS: 'daoSupportedNetworks',
}

export const GET_WALLET_LIST_TYPES = {
  CACHE: 'lazy',
  WALLETS: 'wallets',
  DETAIL: 'detail',
}

export const DELEGATION_TYPES = {
  STAKE: 'stake',
  UNSTAKE: 'unstake',
  REDELEGATE: 'redelegate',
}

export const WALLET_TYPES = {
  TREZOR: 'trezor',
  LEDGER: 'ledger',
  ONE_SEED: 'oneSeed',
  PRIVATE_KEY: 'privateKey',
  PUBLIC_KEY: 'publicKey',
  METAMASK: 'metamask',
  KEPLR: 'keplr',
}

export const HARDWARE_SIGNER_WALLET_TYPES = [
  WALLET_TYPES.TREZOR,
  WALLET_TYPES.LEDGER,
]

export const PRIVATE_KEY_SIGNER_WALLET_TYPES = [
  WALLET_TYPES.ONE_SEED,
  WALLET_TYPES.PRIVATE_KEY,
]

export const VIEWING_KEYS_TYPES = {
  SIMPLE: 'simple',
  CUSTOM: 'custom',
  RANDOM: 'random',
}

export const STATUSES = {
  SUCCESS: 'success',
  ERROR: 'error',
}
